"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// ── Typing hook ────────────────────────────────────────────────────────────
// key가 바뀔 때마다 msgs를 처음부터 한 글자씩 타이핑, 완료 시 onDone 호출
function useTyping(msgs: string[], key: number, onDone: () => void) {
  const [typedMsgs, setTypedMsgs]         = useState<string[]>([])
  const [currentTyping, setCurrentTyping] = useState("")
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (!msgs.length) return
    setTypedMsgs([])
    setCurrentTyping("")

    let mIdx = 0, cIdx = 0, stopped = false
    function tick() {
      if (stopped) return
      if (mIdx >= msgs.length) { onDoneRef.current(); return }
      const msg = msgs[mIdx]
      if (cIdx < msg.length) {
        setCurrentTyping(msg.slice(0, cIdx + 1))
        cIdx++
        setTimeout(tick, 50)
      } else {
        setTypedMsgs(p => [...p, msg])
        setCurrentTyping("")
        mIdx++; cIdx = 0
        setTimeout(tick, 300)
      }
    }
    setTimeout(tick, 300)
    return () => { stopped = true }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  return { typedMsgs, currentTyping }
}

// ── API call (Ajax_Guide_Chat_Info 대응) ───────────────────────────────────
async function fetchChat(Step: number, Select_Num: number) {
  const res = await fetch("/api/quickguide/chat-info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Step, Select_Num }),
  })
  if (!res.ok) throw new Error("채팅 정보 조회 오류")
  return res.json() as Promise<{ guideChat: string[]; guideButton: string[] }>
}

// ── Chat Session Block ─────────────────────────────────────────────────────
// GuideChat.cshtml(isRoot=true) + GuideChatView.cshtml(isRoot=false) 대응
interface ChatSessionProps {
  id:             number
  isRoot:         boolean
  p1Msgs:         string[]
  p1Btns:         string[]
  defaultBtns:    string[]
  autoStep?:      number
  autoSelection?: string
  onNewSession:   (step: number, sel: string) => void
}

function ChatSessionBlock({
  id, isRoot, p1Msgs, p1Btns, defaultBtns,
  autoStep, autoSelection, onNewSession,
}: ChatSessionProps) {

  // ── Show/Hide 플래그 (jQuery .show() / .hide() 대응) ────────────────────
  const [showList01, setShowList01] = useState(false)  // 학생/부모 버튼
  const [showList02, setShowList02] = useState(false)  // 학생 세부 버튼
  const [showList03, setShowList03] = useState(false)  // 부모 세부 버튼
  const [showList04, setShowList04] = useState(false)  // 상세 제목
  const [showDetail, setShowDetail] = useState(false)  // 하단 반복 버튼

  // ── 선택 텍스트 (select_01, select_02) ──────────────────────────────────
  const [select01, setSelect01] = useState<string | null>(
    isRoot ? null : (autoSelection ?? null)
  )
  const [select02, setSelect02] = useState<string | null>(null)

  // ── 데이터 ──────────────────────────────────────────────────────────────
  const [p2Msgs,  setP2Msgs]  = useState<string[]>([])
  const [p2Btns,  setP2Btns]  = useState<string[]>([])
  const [p2Step,  setP2Step]  = useState<number | null>(isRoot ? null : (autoStep ?? null))
  const [p3Msgs,  setP3Msgs]  = useState<string[]>([])
  const [p3Title, setP3Title] = useState<string | null>(null)

  // ── Typing 키 (단계 진입마다 +1 → 처음부터 다시 타이핑) ────────────────
  const [p2Key, setP2Key] = useState(0)
  const [p3Key, setP3Key] = useState(0)

  // ── useTyping: chatList1 → 완료 시 Guide_List_01 표시 ───────────────────
  const { typedMsgs: p1Typed, currentTyping: p1Cur } = useTyping(
    isRoot ? p1Msgs : [],
    0,
    useCallback(() => setShowList01(true), [])
  )

  // ── useTyping: chatList2 → 완료 시 Guide_List_02 or 03 표시 ─────────────
  const p2StepRef = useRef(p2Step)
  p2StepRef.current = p2Step
  const { typedMsgs: p2Typed, currentTyping: p2Cur } = useTyping(
    p2Msgs, p2Key,
    useCallback(() => {
      if (p2StepRef.current === 2) setShowList02(true)
      else                         setShowList03(true)
    }, [])
  )

  // ── useTyping: chatList3 → 완료 시 Guide_List_04 + Detail_Title4 표시 ───
  const { typedMsgs: p3Typed, currentTyping: p3Cur } = useTyping(
    p3Msgs, p3Key,
    useCallback(() => { setShowList04(true); setShowDetail(true) }, [])
  )

  // ── non-root: 마운트 시 자동으로 chatList2 로드 ──────────────────────────
  useEffect(() => {
    if (!isRoot && autoStep !== undefined) void loadP2(autoStep, 0)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── 로드 함수 ────────────────────────────────────────────────────────────
  const loadP2 = async (step: number, selectNum: number) => {
    setP2Step(step)
    setShowList02(false); setShowList03(false)
    const data = await fetchChat(step, selectNum)
    setP2Msgs(data.guideChat.slice(0, 1))
    setP2Btns(data.guideButton)
    setP2Key(k => k + 1)
  }

  const loadP3 = async (step: number, selectNum: number) => {
    const data = await fetchChat(step, selectNum)
    setP3Msgs(data.guideChat.slice(0, 1))
    setP3Title(data.guideChat[1] ?? null)
    setP3Key(k => k + 1)
  }

  // ── 버튼 핸들러 ──────────────────────────────────────────────────────────
  const handleP1Click = async (idx: number) => {
    const step = idx === 0 ? 2 : 3
    setSelect01(p1Btns[idx])
    setShowList01(false)
    await loadP2(step, 0)
  }

  const handleP2Click = async (idx: number) => {
    if (p2Step === null) return
    setSelect02(p2Btns[idx])
    setShowList02(false); setShowList03(false)
    await loadP3(p2Step, idx + 1)
  }

  const handleBottomClick = (idx: number) => {
    onNewSession(idx === 0 ? 2 : 3, defaultBtns[idx] ?? "")
  }

  return (
    <div>
      {/* ── chatList1: 첫 메시지 타이핑 (root only) ──────────────────────── */}
      {isRoot && (
        <div className="chat_guide">
          <div className="guide guide_01">
            <ul id={`chatList1_${id}`}>
              {p1Typed.map((msg, i) => <li key={i} className="chat"><p>{msg}</p></li>)}
              {p1Cur && <li className="chat"><p>{p1Cur}</p></li>}
            </ul>
          </div>

          {/* Guide_List_01: 학생/부모 버튼 — showList01 일 때만 표시 */}
          {showList01 && (
            <div className="guide_list_01" id={`Guide_List_01_${id}`}>
              <ul>
                <li className="list guide_02">
                  <button id={`Student_Tip_${id}`} onClick={() => void handleP1Click(0)}>
                    {p1Btns[0]}
                  </button>
                </li>
                <li className="list guide_03">
                  <button id={`Parent_Tip_${id}`} onClick={() => void handleP1Click(1)}>
                    {p1Btns[1]}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── select_01: 선택 1 표시 ───────────────────────────────────────── */}
      {select01 && (
        <div className="chat_select" id={`select_01_${id}`}>
          <p className="select_chat" id={`Select_Chat_01_${id}`}>{select01}</p>
        </div>
      )}

      {/* ── chatList2: 2단계 메시지 — 데이터가 있을 때만 표시 ────────────── */}
      {p2Msgs.length > 0 && (
        <div className="chat_guide">
          <div className="guide guide_02">
            <ul id={`chatList2_${id}`}>
              {p2Typed.map((msg, i) => <li key={i} className="chat"><p>{msg}</p></li>)}
              {p2Cur && <li className="chat"><p>{p2Cur}</p></li>}
            </ul>
          </div>

          {/* Guide_List_02: 학생 세부 버튼 */}
          {showList02 && (
            <div className="guide_list_02" id={`Guide_List_02_${id}`}>
              <ul>
                {p2Btns.map((btn, i) => (
                  <li key={i} className={`list guide_02_0${i + 1}`}>
                    <button id={`Guide_Tip${i + 1}_${id}`} onClick={() => void handleP2Click(i)}>
                      {btn}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guide_List_03: 부모 세부 버튼 */}
          {showList03 && (
            <div className="guide_list_02" id={`Guide_List_03_${id}`}>
              <ul>
                {p2Btns.map((btn, i) => (
                  <li key={i} className={`list guide_02_0${i + 1}`}>
                    <button id={`Guide_Tip${i + 5}_${id}`} onClick={() => void handleP2Click(i)}>
                      {btn}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── select_02: 선택 2 표시 ───────────────────────────────────────── */}
      {select02 && (
        <div className="chat_select" id={`select_02_${id}`}>
          <p className="select_chat" id={`Select_Chat_02_${id}`}>{select02}</p>
        </div>
      )}

      {/* ── chatList3: 3단계 메시지 — 데이터가 있을 때만 표시 ────────────── */}
      {p3Msgs.length > 0 && (
        <div className="guide chat_guide">
          <div className="guide guide_03">
            <ul id={`chatList3_${id}`}>
              {p3Typed.map((msg, i) => <li key={i} className="chat"><p>{msg}</p></li>)}
              {p3Cur && <li className="chat"><p>{p3Cur}</p></li>}
            </ul>

            {/* Guide_List_04: 상세 제목 */}
            {showList04 && p3Title && (
              <div id={`Guide_List_04_${id}`}>
                <div className="chat" id={`Detail_Title1_${id}`}>
                  <p>{p3Title}</p>
                </div>
              </div>
            )}

            {/* Detail_Title4: 하단 반복 버튼 */}
            {showDetail && (
              <div className="guide_list_01" id={`Detail_Title4_${id}`}>
                <ul>
                  <li className="list guide_02 bottom">
                    <button onClick={() => handleBottomClick(0)}>{defaultBtns[0]}</button>
                  </li>
                  <li className="list guide_03 bottom">
                    <button onClick={() => handleBottomClick(1)}>{defaultBtns[1]}</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── QuickGuideChatUI ───────────────────────────────────────────────────────
export interface QuickGuideChatUIProps {
  guideChat:          string[]
  guideButton:        string[]
  defaultGuideButton: string[]
}

interface ExtraSession { id: number; step: number; sel: string }

export function QuickGuideChatUI({ guideChat, guideButton, defaultGuideButton }: QuickGuideChatUIProps) {
  const [extras, setExtras] = useState<ExtraSession[]>([])
  const nextId              = useRef(1)
  const areaRef             = useRef<HTMLDivElement>(null)

  // createGuideChat 대응: 하단 버튼 클릭 → 새 세션 추가
  const addSession = useCallback((step: number, sel: string) => {
    setExtras(prev => [...prev, { id: nextId.current++, step, sel }])
  }, [])

  // ResizeObserver 대응: 내용이 늘어날 때마다 자동 스크롤
  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    const ro = new ResizeObserver(() => { el.scrollTop = el.scrollHeight })
    Array.from(el.children).forEach(child => ro.observe(child))
    return () => ro.disconnect()
  }, [extras])

  return (
    <main className="guideChat">
      <div className="container">
        {/* 세삼이 프로필 */}
        <div className="chat_profile">
          <div className="img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://img.assesta.com/quickguide/img_guide_01.png" alt="세삼이" />
          </div>
          <strong>똑똑한 안내자 세삼이</strong>
        </div>

        {/* 채팅 영역 (Div_Area) */}
        <div id="Div_Area" ref={areaRef} style={{ overflowY: "auto", height: "430px" }}>
          {/* 루트 세션 (GuideChat.cshtml) */}
          <ChatSessionBlock
            id={0}
            isRoot={true}
            p1Msgs={guideChat}
            p1Btns={guideButton}
            defaultBtns={defaultGuideButton}
            onNewSession={addSession}
          />

          {/* 추가 세션 (GuideChatView.cshtml — createGuideChat 대응) */}
          {extras.map(s => (
            <ChatSessionBlock
              key={s.id}
              id={s.id}
              isRoot={false}
              p1Msgs={[]}
              p1Btns={[]}
              defaultBtns={defaultGuideButton}
              autoStep={s.step}
              autoSelection={s.sel}
              onNewSession={addSession}
            />
          ))}

          <div id="Add_Chat" />
        </div>
      </div>
    </main>
  )
}