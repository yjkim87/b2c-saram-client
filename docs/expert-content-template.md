# Expert Content Template

이 파일 형식대로 `id`별 블록을 채워서 전달하면, 랜딩/전체리스트/상세 페이지에 한 번에 반영할 수 있습니다.

## 작성 규칙
- `id`는 기존 전문가와 동일하게 유지합니다.
- `tags`, `education`, `career`, `certifications`는 콤마 또는 `|` 구분으로 작성 가능합니다.
- `landingTheme`는 아래 중 하나를 사용합니다.
  - `blue`, `amber`, `emerald`, `violet`, `rose`, `sky`, `cyan`, `indigo`
- 미입력 항목은 기존 값 유지 요청으로 처리할 수 있습니다.

## 템플릿
```txt
[id: 1]
name:
specialty:
shortIntro:
tags: , , ,

imageUrl:
listBadge: 없음
landingCredentials:
landingDescription:
landingTheme: blue

categoryBadge:
specialtyLine:
totalSessions:

philosophyHighlights:  | 
philosophyDescription:
bioDescription:

education:  |  | 
career:  |  |  | 
certifications:  |  |  | 
```

## 반영되는 위치
- 공통 데이터 소스: `lib/experts.ts`
- 랜딩 전문가 섹션: `components/expert-section.tsx`
- 전문가 전체 리스트: `app/experts/page.tsx`
- 전문가 상세: `app/experts/[id]/page.tsx`
