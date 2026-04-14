// ------------------------------------------------------------------------------
// 화 일 명 : Quick_Coaching_Guide_Dao.ts
// 용    도 : DB 조회
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 : 
// 주의사항 :
//-------------------------------------------------------------------------------

import sql from "mssql"
import { DatabaseConnLIB, DatabaseConnType, ParameterDirection, SqlParameter } from "@/shared/dao/common/DatabaseConnLIB"
import type { QuickCoachingGuideRow, QuickCoachingGuideDS } from "@/features/quick_coaching_guide/model/Quick_Coaching_Guide_Model"

const databaseConnLIB = new DatabaseConnLIB()
const conn = "real"

export class QuickCoachingGuideDao {

  // ─────────────────────────────────────────────────────────────────────────────
  // 2026-04-13 (김재국) - 퀵코칭가이드 정보 조회
  // ─────────────────────────────────────────────────────────────────────────────
  async LF_Quick_Coaching_Guide_Info(stepId: string): Promise<QuickCoachingGuideDS> {
    const query = "USP_Quick_Coaching_Guide_Info_S00"
    const parameters: SqlParameter[] = [
      { ParameterName: "@Step_Id",  Value: stepId, SqlDbType: sql.NVarChar(200) },
      { ParameterName: "@ErrNum",   SqlDbType: sql.Int(),         Direction: ParameterDirection.Output },
      { ParameterName: "@ErrSev",   SqlDbType: sql.Int(),         Direction: ParameterDirection.Output },
      { ParameterName: "@ErrState", SqlDbType: sql.Int(),         Direction: ParameterDirection.Output },
      { ParameterName: "@ErrProc",  SqlDbType: sql.VarChar(50),   Direction: ParameterDirection.Output },
      { ParameterName: "@ErrLine",  SqlDbType: sql.Int(),         Direction: ParameterDirection.Output },
      { ParameterName: "@ErrMsg",   SqlDbType: sql.VarChar(2000), Direction: ParameterDirection.Output },
    ]
    const recordsets = await databaseConnLIB.ExcDS(query, parameters, DatabaseConnType.SP, conn)
    return {
      contents: (recordsets[0] ?? []) as unknown as QuickCoachingGuideRow[],
      buttons:  (recordsets[1] ?? []) as unknown as QuickCoachingGuideRow[],
    }
  }
}
