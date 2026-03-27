import type { PolicyDocument, PolicyResponse, PolicyType } from "@/features/policy/model/policy.types"

type PrivacyClause = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type PrivacyArticle = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
  clauses?: PrivacyClause[]
  table?: {
    html: string
    insertAfterParagraph?: number
  }
}

export type PrivacyTocItem = {
  id: string
  text: string
  level: 2 | 3
}

const privacyPreamble = [
  "㈜어세스타HRC(이하 \"어세스타HRC\"라 함)는 회원의 개인 정보 보호를 매우 중요시하며, 『정보통신망이용촉진 및 정보보호 등에 관한 법률』, 『개인정보보호법』 등을 준수합니다. 어세스타HRC는 개인정보처리방침을 통하여 회원이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. 어세스타HRC의 다음과 같은 개인정보처리방침을 확인하시기 바랍니다. 어세스타HRC의 개인정보처리방침은 국내 법령 및 지침의 변경과 회사의 정책 변화에 따라 변경될 수 있습니다.",
]

export const privacyArticles: PrivacyArticle[] = [
  {
    id: "article-01",
    title: "제1조 개인정보의 수집항목 및 수집방법",
    paragraphs: [
      "어세스타HRC는 회원가입, 원활한 고객상담, 각종 서비스 등 기본적인 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.",
      "개인정보 수집 항목은 다음과 같습니다.",
    ],
    clauses: [
      {
        id: "article-01-clause-a",
        title: "가. 회원가입 시",
        bullets: [
          "수집 항목 : [필수] 이름, 성별, 생년월일, 가족관계, 휴대폰 번호, 이메일",
          "이용 목적 : [필수] 회원 식별, 공지사항 전달, 서비스 이용 및 상담 등 원활한 의사소통 경로 확보",
        ],
      },
      {
        id: "article-01-clause-b",
        title: "나. 결제 시",
        bullets: [
          "수집 항목 : [필수] 주문자 정보(이름, 휴대폰 번호, 이메일), 결제 정보(카드 정보, 계좌 정보)",
          "이용 목적 : 결제 안내 및 서비스 관련 내용 안내",
        ],
      },
      {
        id: "article-01-clause-c",
        title: "다. 회원정보 수정 시",
        bullets: [
          "수집 항목 : [필수] 회원정보(이름, 성별, 생년월일, 가족관계, 휴대폰 번호, 이메일)",
          "이용 목적 : [필수] 회원 식별, 공지사항 전달, 서비스 이용 및 상담 등 원활한 의사소통 경로 확보",
        ],
      },
      {
        id: "article-01-clause-d",
        title: "라. 무통장 입금 환불 시",
        bullets: [
          "수집 항목 : [필수] 환불계좌 정보(은행명, 계좌번호, 예금주)",
          "수집 목적 : 환불 지급",
        ],
      },
      {
        id: "article-01-clause-e",
        title: "마. 서비스 이용에 따른 자동 수집 및 생성 정보",
        bullets: [
          "수집 항목 : 쿠키, 서비스 이용기록(방문일시, IP, 불량이용기록), 접속 기기 정보(단말기명, OS, 기기 식별정보)",
          "이용 목적 : 본인확인 및 서비스 이용 통계, 부정 이용 방지, 비인가 사용 방지",
        ],
      },
      {
        id: "article-01-clause-extra",
        title: "추가 개인정보 수집 가능 상황",
        paragraphs: [
          "어세스타HRC는 회원가입이나 결제 이외에도 다음과 같은 상황에서 회원에게 이메일, 이름, 휴대폰 번호를 포함한 개인적인 정보를 요구할 수 있습니다.",
        ],
        bullets: [
          "가. 회원이 어세스타HRC가 주최하는 여러 세미나, 프로모션 행사 등에 참여하거나 서비스에 대한 문제 보고 시에 요구할 수 있습니다.",
          "나. 회원이 어세스타HRC에 연락하거나, 연구 목적으로 사용하기 위하여 설문조사를 하는 경우 통신사항을 기록할 수 있습니다.",
          "다. 회원이 정보의 제공이 적절하지 않다고 판단될 경우 해당 행사에 참여하지 않을 수 있습니다.",
        ],
      },
      {
        id: "article-01-clause-method",
        title: "개인정보 수집 방법",
        paragraphs: ["개인정보 수집 방법은 다음과 같습니다."],
        bullets: ["홈페이지 회원가입, 서비스 이용, 이벤트 응모, 생성정보 수집 틀을 통한 수집"],
      },
    ],
  },
  {
    id: "article-02",
    title: "제2조 개인정보 수집 및 이용 목적",
    paragraphs: [
      "어세스타HRC는 개인정보를 다음의 목적을 위해 활용합니다. 회원이 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며 이용 목적이 변경될 시에는 사전 동의를 구합니다.",
    ],
    clauses: [
      {
        id: "article-02-clause-01",
        title: "서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 비용 정산",
        paragraphs: ["구매 및 비용 결제, 금융거래 본인 인증 및 금융 서비스, 비용 추심 등"],
      },
      {
        id: "article-02-clause-02",
        title: "회원 관리",
        paragraphs: [
          "개인식별, 불량회원의 부정 이용방지와 비인가 사용방지, 가입의사 확인, 가입 및 가입횟수 제한, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달, 회원 탈퇴 의사 확인",
        ],
      },
      {
        id: "article-02-clause-03",
        title: "마케팅 및 광고에 활용",
        paragraphs: [
          "신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 접속빈도 파악, 회원의 서비스 이용에 대한 통계",
        ],
      },
    ],
  },
  {
    id: "article-03",
    title: "제3조 목적 외 사용 및 제3자에 대한 제공 및 공유",
    paragraphs: [
      "어세스타HRC는 회원의 동의가 있거나 관련 법령의 규정에 의한 경우를 제외하고는 어떠한 경우에도 『개인정보의 수집목적 및 이용 목적』에서 고지한 범위를 넘어 회원의 개인정보를 이용하거나 타인 또는 타기업, 기관에 제공하지 않습니다.",
      "회원의 개인정보를 제공하거나 공유하는 경우에는 사전에 회원에게 제공받거나 공유하는 자가 누구이며 주된 사업이 무엇인지, 제공 또는 공유되는 개인정보항목이 무엇인지, 개인정보를 제공하거나 공유하는 목적이 무엇인지 등에 대해 개인정보 수집에 대한 동의 절차에 따라 회원에게 동의 또는 거부할 수 있도록 조치하거나 개별적으로 이메일 또는 서면을 통해 고지한 후 이에 대한 동의를 구합니다.",
      "다만, 다음의 경우에는 관련 법령의 규정에 의하여 회원의 동의 없이 개인정보를 제공하는 것이 가능합니다.",
    ],
    bullets: [
      "회원이 사전에 공개에 동의한 경우",
      "법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우",
      "회원 또는 그 법정 대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 회원 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우",
      "통계 작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 개인정보를 제공하는 경우",
    ],
  },
  {
    id: "article-04",
    title: "제4조 개인정보",
    paragraphs: [
      "개인정보 수집에 대한 동의를 받습니다. 회원의 개인정보 수집과 관련하여 어세스타HRC의 개인정보보호방침 또는 이용약관의 내용에 대해 동의 여부를 체크할 수 있는 절차를 마련하며, 회원이 회원가입 시 동의를 체크하면 개인정보 수집에 대해 동의한 것으로 간주합니다.",
    ],
  },
  {
    id: "article-05",
    title: "제5조 개인정보의 처리위탁",
    paragraphs: [
      "어세스타HRC는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.",
      "어세스타HRC의 개인정보 위탁처리 기관 및 위탁 업무 내용은 다음과 같습니다.",
      "위의 수탁업체 외에 서비스 이용 및 통계 분석을 목적으로 Google이 제공하는 로그 분석 도구인 Google Analytics를 이용하고 있습니다. Google Analytics를 통해 수집하는 정보는 이용자 개인을 식별할 수 없는 비식별정보입니다. Google의 정보 처리를 원하지 않는 경우 <a href=\"https://tools.google.com/dlpage/gaoptout\" target=\"_blank\" rel=\"noopener noreferrer\">Google Analytics 차단 브라우저 부가 기능</a>을 다운로드 및 설치하여 정보 처리를 거부할 수 있습니다.",
    ],
    table: {
      insertAfterParagraph: 1,
      html: `
        <div class="policy-table-wrap">
          <table class="policy-table">
            <tbody>
              <tr>
                <th scope="col">수탁업체</th>
                <th scope="col">위탁업무내용</th>
                <th scope="col">개인정보의 보유 및 이용기간</th>
              </tr>
              <tr>
                <td>(주)케이지이니시스, 엔에이치엔케이씨피(주)</td>
                <td>결제 처리</td>
                <td rowspan="2">회원탈퇴 시 혹은 위탁계약 종료 시까지</td>
              </tr>
              <tr>
                <td>엔에이치엔클라우드(주)</td>
                <td>카카오톡 알림톡/친구톡, 문자메시지 발송</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    },
  },
  {
    id: "article-06",
    title: "제6조 회원의 권리와 그 행사방법",
    paragraphs: [
      "회원은 언제든지 등록되어 있는 자신의 개인정보의 열람, 정정, 삭제, 처리정지 요구를 할 수 있습니다.",
      "회원에 대한 개인정보 열람, 정정, 삭제, 처리정지 요구는 teamdiscovery@assesta.com의 메일 주소를 통해 접수할 수 있으며 확인 후 지체 없이 조치하여 드립니다.",
      "회원이 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 합니다.",
    ],
  },
  {
    id: "article-07",
    title: "제7조 개인정보보호책임자 및 개인정보보호담당자",
    paragraphs: [
      "회원의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 어세스타HRC는 개인정보보호책임자를 두고 있습니다.",
      "개인정보와 관련한 문의사항이 있으시면 아래의 개인정보보호책임자에게 연락 주시기 바랍니다.",
      "귀하의 문의사항에 신속하고 성실하게 답변 해드리겠습니다.",
    ],
    clauses: [
      {
        id: "article-07-clause-officer",
        title: "개인정보보호 책임자",
        bullets: [
          "이름: 손성훈",
          "소속(직위): ㈜어세스타HRC(IT팀 팀장)",
          "전화: 02-787-1422",
          "e-mail: shson@assesta.com",
          "Fax: 02-787-1408",
        ],
      },
    ],
  },
  {
    id: "article-08",
    title: "제8조 쿠키에 의한 개인정보 수집",
    paragraphs: [
      "어세스타HRC는 회원의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)'를 운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다.",
      "어세스타HRC는 다음과 같은 목적을 위해 쿠키를 사용합니다.",
    ],
    clauses: [
      {
        id: "article-08-clause-purpose",
        title: "쿠키 사용 목적",
        bullets: [
          "회원과 비회원의 접속 빈도나 방문 시간 등을 분석하고 회원의 취향과 관심분야를 파악하여 타겟(target) 마케팅 및 서비스 개편 등의 척도로 활용합니다.",
          "구매한 품목들에 대한 정보와 관심 있게 둘러본 품목들에 대한 자취를 추적하여 다음 번 구매 때 개인 맞춤 서비스를 제공하는 데 이용합니다.",
          "어세스타HRC에서 진행하는 각종 이벤트에서 회원의 참여 정도 및 방문 회수를 파악하여 차별적인 응모 기회를 부여하고 개인의 관심 분야에 따라 차별화된 정보를 제공하기 위한 자료로 이용됩니다.",
        ],
      },
      {
        id: "article-08-clause-settings",
        title: "쿠키 설정 거부 방법",
        paragraphs: [
          "회원은 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 회원은 웹 브라우저에서 옵션(도구 > 인터넷 옵션)을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.",
          "쿠키 설정을 거부하는 방법은 MS Internet Explorer 기준으로 메뉴에서 도구 > 인터넷 옵션 > 개인정보 에서 설정할 수 있습니다. 단, 회원이 웹 브라우저의 쿠키 사용을 허용하지 않았을 경우에는 어세스타HRC에서 제공하는 일부 서비스 이용에 어려움이 있을 수 있습니다.",
        ],
      },
    ],
  },
  {
    id: "article-09",
    title: "제9조 개인정보의 열람 및 정정 방법",
    paragraphs: [
      "회원은 언제든지 등록되어 있는 본인에 대한 개인정보를 열람하거나 정정할 수 있습니다. 회원은 본인의 개인정보에 대한 열람 또는 정정을 하고자 할 경우에는 로그인 후 '마이페이지' 메뉴에서 직접 열람 또는 정정하거나, teamdiscovery@assesta.com의 메일 주소로 연락하시면 지체 없이 조치하여 드립니다.",
    ],
  },
  {
    id: "article-10",
    title: "제10조 동의철회(회원 탈퇴) 방법",
    paragraphs: [
      "회원은 회원가입 시 개인정보의 수집 · 이용 및 제공에 대해 동의하신 내용을 언제든지 철회하실 수 있습니다. teamdiscovery@assesta.com의 메일 주소로 요청하시면 지체 없이 개인정보를 파기하는 등 필요한 조치를 하겠습니다.",
    ],
  },
  {
    id: "article-11",
    title: "제11조 개인정보의 보유기간 및 이용 기간",
    paragraphs: [
      "어세스타HRC 회원 가입 후, 회원의 개인정보는 서비스 제공을 위해 어세스타HRC에서 보유하게 됩니다.",
      "원칙적으로 회원 탈퇴 요청이나 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.",
      "단, 아래와 같은 경우는 일정한 기간 동안 회원정보를 보관합니다.",
    ],
    clauses: [
      {
        id: "article-11-clause-company",
        title: "회사 내부 방침",
        bullets: [
          "보관 항목 : 이메일 사용 여부 기록",
          "보관 이유 : 특정 이메일에 대한 소유 분쟁으로 무분별한 재가입/탈퇴 방지",
          "보관 기간 : 서비스 중지 시까지",
        ],
      },
      {
        id: "article-11-clause-law",
        title: "관련 법령 규정",
        paragraphs: [
          "관계 법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.",
        ],
        bullets: [
          "계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래 등에서의 소비자보호에 관한 법률)",
          "대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래 등에서의 소비자보호에 관한 법률)",
          "소비자의 불만 또는 분쟁 처리에 관한 기록 : 3년 (전자상거래 등에서의 소비자보호에 관한 법률)",
          "전자금융 거래에 관한 기록 : 5년 (전자금융거래법)",
          "웹사이트 방문기록 : 3개월 (통신비밀보호법)",
        ],
      },
      {
        id: "article-11-clause-inactive",
        title: "장기 미이용 회원 정보 관리",
        paragraphs: [
          "어세스타HRC는 회원이 1년간 로그인 기록이 없는 경우, 해당 개인정보는 '정보통신망 이용촉진 및 정보보호 등에 관한 법률' 제29조에 근거하여 회원에게 사전 통지하고 개인정보를 파기하거나 별도로 분리하여 저장 관리합니다. 단, 관계 법령에 의한 개인정보 보존이 필요한 경우에는 규정된 기간 동안 보관합니다.",
        ],
      },
    ],
  },
  {
    id: "article-12",
    title: "제12조 개인정보 파기 절차 및 방법",
    paragraphs: [
      "원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기 절차 및 방법은 다음과 같습니다.",
    ],
    clauses: [
      {
        id: "article-12-clause-process",
        title: "파기절차",
        bullets: [
          "회원이 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용 기간 참조) 일정 기간 저장된 후 파기됩니다.",
          "별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.",
        ],
      },
      {
        id: "article-12-clause-method",
        title: "파기방법",
        bullets: [
          "전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.",
          "종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기 합니다.",
        ],
      },
    ],
  },
  {
    id: "article-13",
    title: "제13조 개인정보의 기술적 · 관리적 보호 대책",
    paragraphs: [
      "어세스타HRC는 회원의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 · 관리적 보호 대책을 강구하고 있습니다.",
    ],
    clauses: [
      {
        id: "article-13-clause-password",
        title: "비밀번호 암호화",
        paragraphs: [
          "회원의 비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 한해서만 가능합니다.",
        ],
      },
      {
        id: "article-13-clause-hacking",
        title: "해킹 등에 대비한 대책",
        paragraphs: [
          "어세스타HRC는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신 프로그램을 이용하여 회원의 개인정보나 자료가 유출되거나 손상되지 않도록 방지하고 있으며, 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다. 그리고 침입 차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.",
        ],
      },
      {
        id: "article-13-clause-staff",
        title: "처리 직원의 최소화 및 교육",
        paragraphs: [
          "어세스타HRC의 개인정보 처리업무는 담당자에 한정시키고 있고 이를 위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 어세스타HRC의 개인정보보호 관련 정책 · 지침 등과 개인정보 처리방침의 준수를 항상 강조하고 있습니다.",
        ],
      },
      {
        id: "article-13-clause-organization",
        title: "개인정보보호 전담기구의 운영",
        paragraphs: [
          "어세스타HRC는 개인정보 처리방침의 이행사항 및 담당자의 준수 여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로잡을 수 있도록 노력하고 있습니다. 단, 회원 본인의 부주의나 인터넷상의 문제로 이메일, 비밀번호 등 개인정보가 유출되어 발생한 문제에 대해서는 어세스타HRC는 어떠한 책임도 부담하지 않습니다.",
        ],
      },
    ],
  },
  {
    id: "article-14",
    title: "제14조 개인정보의 상실, 오용, 도용, 변경을 막기 위한 보안 예방책",
    paragraphs: [
      "개인정보는 비밀번호에 의해 보호되고 있으므로, 오직 회원 본인만이 이러한 개인정보에 접속할 수 있습니다. 회원은 로그인 정보를 이용해서 자신의 회원정보를 수정할 수 있습니다. 비밀번호는 그 누구에게도 알려주어서는 안 됩니다.",
      "어세스타HRC는 절대 불필요한 전화나 이메일로 이용자의 비밀번호를 묻거나 하지 않습니다. 또한 작업을 마친 후에는 반드시 회원의 계정을 종료하고, 웹 브라우저의 창을 닫아주시기 바랍니다. 이는 회원이 다른 사람과 컴퓨터를 공유하거나, 인터넷 카페나 도서관 같은 공공장소에서 컴퓨터를 사용하는 경우 다른 사람이 회원의 개인정보 및 통신내용을 함부로 볼 수 없도록 하기 위한 것입니다.",
      "어세스타HRC는 회원의 개인정보를 보호하기 위해 최선의 노력을 다하지만, 인터넷을 통한 데이터 전송은 100% 안전하다고 보장할 수 없습니다. 따라서 개인정보보호를 위한 이용자 수칙 등을 준수하고, 자신의 소중한 개인정보보호에 각별히 주의하시기를 바랍니다.",
      "온라인상에서 예를 들어서 게시판이나, 이메일을 통해서, 또는 대화방을 통해서 회원이 자발적으로 제공하는 개인정보는 다른 사람들이 수집하여 사용할 수 있음을 항상 유념해 주시기 바랍니다. 간단히 말해서, 공개적으로 접속할 수 있는 온라인상에서 개인정보를 게재하는 경우, 다른 사람들로부터 원치 않는 메시지를 받게 될 수도 있습니다.",
      "계정의 비밀번호에 대한 보안을 유지할 책임은 회원에게 있습니다. 따라서, 온라인상에 접속해 있을 때에는 각별히 주의하시기 바랍니다.",
    ],
    clauses: [
      {
        id: "article-14-clause-guideline",
        title: "개인정보보호를 위한 이용자 수칙",
        bullets: [
          "개인정보 제공은 필요한 경우에만 제공한다.",
          "개인정보 제공 시 개인정보보호방침을 반드시 확인한다.",
          "개인정보의 공개, 비공개를 선택할 수 있는 경우 반드시 비공개를 선택한다.",
          "게시판 등에 자신 및 타인의 개인정보를 함부로 게재하지 않는다.",
          "주기적으로 검색 포털을 통해 자신의 이름, 주민번호, 핸드폰 번호 등을 검색하여 개인정보 노출 여부를 점검한다.",
          "자신의 개인정보가 노출된 사실을 발견했을 경우 해당 웹사이트 또는 검색포털 사이트 등에 삭제 요청 등 적극적으로 조치를 요구한다.",
        ],
      },
    ],
  },
  {
    id: "article-15",
    title: "제15조 개인정보침해 관련 상담 및 신고",
    paragraphs: ["개인정보침해에 대한 신고 또는 상담이 필요하신 경우에는 아래 기관으로 문의 하시기 바랍니다."],
    bullets: [
      "<a href=\"https://privacy.kisa.or.kr\" target=\"_blank\" rel=\"noopener noreferrer\">개인정보침해신고센터</a> / 국번없이 118",
      "<a href=\"https://www.spo.go.kr\" target=\"_blank\" rel=\"noopener noreferrer\">대검찰청 사이버수사과</a> / 국번없이 1301",
      "<a href=\"https://cyberbureau.police.go.kr\" target=\"_blank\" rel=\"noopener noreferrer\">경찰청 사이버테러대응센터</a> / 국번없이 182",
    ],
  },
  {
    id: "article-16",
    title: "제16조 고지의 의무",
    paragraphs: [
      "어세스타HRC는 본 개인정보 처리방침을 변경하는 경우 그 변경 사유 및 적용일자를 명시하여 현행 개인정보 처리방침과 함께 적용일자 10일전부터 적용일전까지 서비스 화면에 고지합니다. 다만, 회원의 권리 또는 의무에 중요한 내용의 변경이 있을 경우에는 최소 30일 전에 고지합니다.",
      "어세스타HRC가 제1항에 따라 변경 내용을 고지하면서 변경 적용 일까지 거부의사를 표시하지 않으면 의사표시가 된 것으로 본다는 뜻을 고지하였음에도 불구하고 회원이 명시적으로 거부의사를 표시하지 아니하는 경우 이용자가 변경 내용에 동의한 것으로 봅니다.",
      "어세스타HRC는 제 2항에도 불구하고 회원으로부터 개인정보를 추가 수집하거나 제3자에게 제공하는 경우에는 이용자 본인으로부터 이에 대하여 별도 동의 절차를 거칩니다.",
    ],
    clauses: [
      {
        id: "article-16-clause-effective-date",
        title: "적용 일자 및 문의",
        bullets: [
          "적용 일자 : 2026년 4월 1일",
          "서비스 이용과 관련하여 궁금하신 사항이 있으시면 teamdiscovery@assesta.com으로 문의 주시기 바랍니다.",
        ],
      },
    ],
  },
]

function renderParagraphs(paragraphs?: string[]) {
  if (!paragraphs?.length) {
    return ""
  }

  return paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")
}

function renderBullets(bullets?: string[]) {
  if (!bullets?.length) {
    return ""
  }

  const items = bullets.map((item) => `<li>${item}</li>`).join("")
  return `<ul>${items}</ul>`
}

function renderClause(clause: PrivacyClause) {
  return `
    <h3 id="${clause.id}">${clause.title}</h3>
    ${renderParagraphs(clause.paragraphs)}
    ${renderBullets(clause.bullets)}
  `
}

function renderArticle(article: PrivacyArticle) {
  const clauses = article.clauses?.map(renderClause).join("") ?? ""
  const renderedParagraphs =
    article.paragraphs?.reduce((accumulator, paragraph, index) => {
      const paragraphHtml = `<p>${paragraph}</p>`

      if (article.table && article.table.insertAfterParagraph === index) {
        return `${accumulator}${paragraphHtml}${article.table.html}`
      }

      return `${accumulator}${paragraphHtml}`
    }, "") ?? ""

  const tableHtml =
    article.table &&
    (article.table.insertAfterParagraph === undefined ||
      !article.paragraphs ||
      article.table.insertAfterParagraph >= article.paragraphs.length)
      ? article.table.html
      : ""

  return `
    <h2 id="${article.id}">${article.title}</h2>
    ${renderedParagraphs}
    ${tableHtml}
    ${renderBullets(article.bullets)}
    ${clauses}
  `
}

function buildPrivacyContent() {
  const preambleHtml = renderParagraphs(privacyPreamble)
  const articleHtml = privacyArticles.map(renderArticle).join("")

  return `${preambleHtml}${articleHtml}`
}

const privacyContent = buildPrivacyContent()

export const privacyToc: PrivacyTocItem[] = privacyArticles.flatMap((article) => {
  const topLevel: PrivacyTocItem = {
    id: article.id,
    text: article.title,
    level: 2,
  }

  const clauseLevel =
    article.clauses?.map<PrivacyTocItem>((clause) => ({
      id: clause.id,
      text: clause.title,
      level: 3,
    })) ?? []

  return [topLevel, ...clauseLevel]
})

const privacyPolicy: PolicyDocument = {
  type: "privacy",
  title: "개인정보처리방침",
  content: privacyContent,
  updatedAt: "2026-04-01",
}

const privacyPolicyPrevious: PolicyDocument = {
  type: "privacy",
  title: "개인정보처리방침",
  content: privacyContent,
  updatedAt: "2026-03-25",
}

type PolicyHistoryMap = Record<PolicyType, PolicyDocument[]>

export const mockPolicyHistory: PolicyHistoryMap = {
  privacy: [privacyPolicy, privacyPolicyPrevious],
  terms: [],
}

export const mockPolicy: Record<PolicyType, PolicyResponse> = {
  privacy: mockPolicyHistory.privacy[0] ?? null,
  terms: null,
}
