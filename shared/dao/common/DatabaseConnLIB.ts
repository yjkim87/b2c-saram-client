// ------------------------------------------------------------------------------
// 화 일 명 : DatabaseConnLIB.ts
// 용    도 : MSSQL DB 연결 및 쿼리 실행 공통 라이브러리
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 :
// 주의사항 : DB 연결 정보는 .env.local 에서만 관리 (코드에 직접 기입 금지)
//-------------------------------------------------------------------------------

import sql from "mssql"

// ─── DatabaseConnType ────────────────────────────────────────────────────────
// 쿼리 실행 방식 지정. TXT: 일반 SQL 문자열, SP: 저장 프로시저
export enum DatabaseConnType {
  TXT = "text",
  SP  = "sp",
}

// ─── 연결 설정 ───────────────────────────────────────────────────────────────
// DB 서버 접속 정보. 실제 값은 .env.local 환경 변수에서 주입
const ConnectionStrings: Record<string, sql.config> = {
  real: {
    server:   process.env.DB_SERVER!,
    port:     parseInt(process.env.DB_PORT ?? "1433"),
    user:     process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    options: {
      trustServerCertificate: true,
      encrypt: false,
    },
  },
}

// ─── 커넥션 풀 싱글턴 ────────────────────────────────────────────────────────
// DB 연결을 요청마다 새로 생성하지 않고 풀에서 재사용하여 성능을 높임
const _pools = new Map<string, sql.ConnectionPool>()

async function _getPool(Company: string): Promise<sql.ConnectionPool> {
  if (!_pools.has(Company)) {
    const cfg = ConnectionStrings[Company]
    if (!cfg) throw new Error(`연결 문자열 '${Company}'을 찾을 수 없습니다.`)
    _pools.set(Company, await new sql.ConnectionPool(cfg).connect())
  }
  return _pools.get(Company)!
}

// ─── SqlParameter ────────────────────────────────────────────────────────────
// SP 파라미터 타입 정의. Input(기본값 전달) / Output(결과값 수신) 방향 지정 가능
export enum ParameterDirection {
  Input  = "input",
  Output = "output",
}

export type SqlParameter = {
  ParameterName: string       // "@ErrNum", "@Step_Id" 등 (@ 포함 가능)
  Value?:        unknown
  SqlDbType?:    sql.ISqlType
  Direction?:    ParameterDirection
}

// ─── _bindParams (내부 헬퍼) ─────────────────────────────────────────────────
// SqlParameter 배열을 Request 객체에 등록. "@" 접두사는 자동으로 제거하여 처리
function _bindParams(request: sql.Request, parameters?: SqlParameter[]) {
  if (!parameters) return
  for (const p of parameters) {
    const name = p.ParameterName.startsWith("@") ? p.ParameterName.slice(1) : p.ParameterName
    if (p.Direction === ParameterDirection.Output) {
      request.output(name, p.SqlDbType ?? sql.VarChar)
    } else {
      p.SqlDbType
        ? request.input(name, p.SqlDbType, p.Value)
        : request.input(name, p.Value)
    }
  }
}

// ─── DatabaseConnLIB ─────────────────────────────────────────────────────────
// 모든 DAO에서 공통으로 사용하는 DB 실행 클래스.
// ExcDR / ExcDT / ExcDS / ExcNONQ / ExcNONQNoTran 함수로 구성
export class DatabaseConnLIB {

  // ─── ExcDR ────────────────────────────────────────────────────────────────
  // 단일 행(Row) 하나만 반환. 결과가 없으면 null 반환.
  // 사용 예: 단건 조회 (회원 정보, 설정값 등)
  async ExcDR<T = Record<string, unknown>>(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp?:      DatabaseConnType,
    Company?:    string,
  ): Promise<T | null> {
    const rows = await this.ExcDT<T>(Query, parameters, cmdtp, Company)
    return rows[0] ?? null
  }

  // ─── ExcDT ────────────────────────────────────────────────────────────────
  // 여러 행(Row)을 배열로 반환.
  // 사용 예: 목록 조회 (게시판 리스트, 상품 목록 등)
  async ExcDT<T = Record<string, unknown>>(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp      = DatabaseConnType.SP,
    Company    = "real",
  ): Promise<T[]> {
    const pool = await _getPool(Company)
    const req  = pool.request()
    _bindParams(req, parameters)
    const result = cmdtp === DatabaseConnType.SP
      ? await req.execute(Query)
      : await req.query(Query)
    return result.recordset as T[]
  }

  // ─── ExcDS ────────────────────────────────────────────────────────────────
  // SP에서 SELECT 여러 개를 실행할 때 결과셋 배열로 반환.
  // 사용 예: SP 내에서 성격이 다른 두 결과를 한 번에 조회할 때
  //          (recordsets[0] → 콘텐츠, recordsets[1] → 버튼)
  async ExcDS(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp      = DatabaseConnType.SP,
    Company    = "real",
  ): Promise<sql.IRecordSet<Record<string, unknown>>[]> {
    const pool = await _getPool(Company)
    const req  = pool.request()
    _bindParams(req, parameters)
    const result = cmdtp === DatabaseConnType.SP
      ? await req.execute(Query)
      : await req.query(Query)
    return result.recordsets as unknown as sql.IRecordSet<Record<string, unknown>>[]
  }

  // ─── ExcNONQ ──────────────────────────────────────────────────────────────
  // INSERT / UPDATE / DELETE 실행. 트랜잭션 적용 (실패 시 자동 롤백).
  // 영향받은 행 수(rowsAffected)를 반환.
  // 사용 예: 데이터 저장/수정/삭제처럼 실패 시 되돌려야 하는 작업
  async ExcNONQ(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp      = DatabaseConnType.SP,
    Company    = "real",
  ): Promise<number> {
    const pool        = await _getPool(Company)
    const transaction = new sql.Transaction(pool)
    await transaction.begin()
    try {
      const req    = new sql.Request(transaction)
      _bindParams(req, parameters)
      const result = cmdtp === DatabaseConnType.SP
        ? await req.execute(Query)
        : await req.query(Query)
      await transaction.commit()
      return result.rowsAffected[0] ?? 0
    } catch (e) {
      await transaction.rollback()
      throw e
    }
  }

  // ─── ExcNONQNoTran ────────────────────────────────────────────────────────
  // INSERT / UPDATE / DELETE 실행. 트랜잭션 없이 단순 실행.
  // 영향받은 행 수(rowsAffected)를 반환.
  // 사용 예: 로그 기록, 조회수 증가 등 실패해도 롤백이 불필요한 단순 쓰기 작업
  async ExcNONQNoTran(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp      = DatabaseConnType.SP,
    Company    = "real",
  ): Promise<number> {
    const pool = await _getPool(Company)
    const req  = pool.request()
    _bindParams(req, parameters)
    const result = cmdtp === DatabaseConnType.SP
      ? await req.execute(Query)
      : await req.query(Query)
    return result.rowsAffected[0] ?? 0
  }
}
