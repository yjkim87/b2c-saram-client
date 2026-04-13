// ─────────────────────────────────────────────────────────────────────────────
// QuickGuideDao.ts
// C#의 QuickGuideDao.cs 패턴
// ─────────────────────────────────────────────────────────────────────────────

import sql from "mssql"
import { DatabaseConnLIB, DatabaseConnType, ParameterDirection, SqlParameter } from "@/shared/dao/common/DatabaseConnLIB"
import { GuideChatInfoRow, GuideChatInfoDS } from "@/features/quickguide/model/QuickGuide_Model"

const databaseConnLIB = new DatabaseConnLIB()
const conn = "real"

export class QuickGuideDao {

  async LF_Guide_Chat_Info(Step: number, Select_Num: number): Promise<GuideChatInfoDS> {
    const query = "USP_Guide_Chat_Info_S00"
    const parameters: SqlParameter[] = [
      { ParameterName: "@Step",       Value: Step       },
      { ParameterName: "@Select_Num", Value: Select_Num },
      { ParameterName: "@ErrNum",   SqlDbType: sql.Int(),           Direction: ParameterDirection.Output },
      { ParameterName: "@ErrSev",   SqlDbType: sql.Int(),           Direction: ParameterDirection.Output },
      { ParameterName: "@ErrState", SqlDbType: sql.Int(),           Direction: ParameterDirection.Output },
      { ParameterName: "@ErrProc",  SqlDbType: sql.VarChar(50),     Direction: ParameterDirection.Output },
      { ParameterName: "@ErrLine",  SqlDbType: sql.Int(),           Direction: ParameterDirection.Output },
      { ParameterName: "@ErrMsg",   SqlDbType: sql.VarChar(2000),   Direction: ParameterDirection.Output },
    ]
    const recordsets = await databaseConnLIB.ExcDS(query, parameters, DatabaseConnType.SP, conn)
    return {
      contents:   (recordsets[0] ?? []) as unknown as GuideChatInfoRow[],
      buttons:    (recordsets[1] ?? []) as unknown as GuideChatInfoRow[],
      allButtons: (recordsets[2] ?? []) as unknown as GuideChatInfoRow[],
    }
  }
}
