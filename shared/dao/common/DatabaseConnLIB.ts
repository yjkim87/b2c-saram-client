import sql from "mssql"

// ─── DatabaseConnType (C#의 DatabaseConnType enum 대응) ──────────────────────
export enum DatabaseConnType {
  TXT = "text", // CommandType.Text
  SP  = "sp",   // CommandType.StoredProcedure
}

// ─── 연결 설정 (Web.config <connectionStrings> 대응) ─────────────────────────
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

// ─── 커넥션 풀 싱글턴 (C#에서 SqlConnection을 매번 new하는 대신 풀 재사용) ──
const _pools = new Map<string, sql.ConnectionPool>()

async function _getPool(Company: string): Promise<sql.ConnectionPool> {
  if (!_pools.has(Company)) {
    const cfg = ConnectionStrings[Company]
    if (!cfg) throw new Error(`연결 문자열 '${Company}'을 찾을 수 없습니다.`)
    _pools.set(Company, await new sql.ConnectionPool(cfg).connect())
  }
  return _pools.get(Company)!
}

// ─── SqlParameter (C#의 SqlParameter 대응) ───────────────────────────────────
export enum ParameterDirection {
  Input  = "input",
  Output = "output",
}

export type SqlParameter = {
  ParameterName: string       // "@IP", "@Mem_No" 등 (@ 포함 가능)
  Value?:        unknown
  SqlDbType?:    sql.ISqlType
  Direction?:    ParameterDirection
}

// ─── 내부 헬퍼: Request에 파라미터 등록 ─────────────────────────────────────
function _bindParams(request: sql.Request, parameters?: SqlParameter[]) {
  if (!parameters) return
  for (const p of parameters) {
    // C#의 "@ParamName" 그대로 써도 mssql이 처리할 수 있도록 @ 제거
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

// ─────────────────────────────────────────────────────────────────────────────
// DatabaseConnLIB (C#의 DatabaseConnLIB 클래스 대응)
// ─────────────────────────────────────────────────────────────────────────────
export class DatabaseConnLIB {

  // ─── ExcDR: 단일 DataRow 반환 ─────────────────────────────────────────────
  async ExcDR<T = Record<string, unknown>>(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp?:      DatabaseConnType,
    Company?:    string,
  ): Promise<T | null> {
    const rows = await this.ExcDT<T>(Query, parameters, cmdtp, Company)
    return rows[0] ?? null
  }

  // ─── ExcDT: DataTable (행 배열) 반환 ──────────────────────────────────────
  async ExcDT<T = Record<string, unknown>>(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp      = DatabaseConnType.SP,
    Company    = "test",
  ): Promise<T[]> {
    const pool = await _getPool(Company)
    const req  = pool.request()
    _bindParams(req, parameters)
    const result = cmdtp === DatabaseConnType.SP
      ? await req.execute(Query)
      : await req.query(Query)
    return result.recordset as T[]
  }

  // ─── ExcDS: DataSet (여러 결과셋) 반환 ────────────────────────────────────
  async ExcDS(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp      = DatabaseConnType.SP,
    Company    = "test",
  ): Promise<sql.IRecordSet<Record<string, unknown>>[]> {
    const pool = await _getPool(Company)
    const req  = pool.request()
    _bindParams(req, parameters)
    const result = cmdtp === DatabaseConnType.SP
      ? await req.execute(Query)
      : await req.query(Query)
    return result.recordsets as unknown as sql.IRecordSet<Record<string, unknown>>[]
  }

  // ─── ExcNONQ: INSERT/UPDATE/DELETE (트랜잭션 O) ───────────────────────────
  async ExcNONQ(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp      = DatabaseConnType.SP,
    Company    = "test",
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

  // ─── ExcNONQNoTran: INSERT/UPDATE/DELETE (트랜잭션 X) ────────────────────
  async ExcNONQNoTran(
    Query:      string,
    parameters?: SqlParameter[],
    cmdtp      = DatabaseConnType.SP,
    Company    = "test",
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
