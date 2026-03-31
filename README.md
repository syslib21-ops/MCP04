# Markdown Static Blog (Next.js + GitHub Pages)

정적 페이지로 빌드되는 개인 블로그 템플릿입니다.  
마크다운 글 작성, 월별 아카이브, 태그/카테고리 분류, GitHub Pages 배포를 지원합니다.

## 주요 기능

- 정적 빌드: `next build` 시 `out/` 생성 (`output: "export"`)
- 메뉴: Home / About / Blog
- 글 관리: `posts/YYYY/MM/*.md` 구조
- 분류: Frontmatter의 `tags`, `category` 기반 분류 페이지 자동 생성
- 배포: `.github/workflows/deploy.yml` 로 GitHub Pages 자동 배포

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 을 열어 확인합니다.

## 글 작성 방법

새 글을 `posts/YYYY/MM/your-slug.md` 형태로 생성하고, Frontmatter를 작성합니다.

```md
---
title: "글 제목"
date: "2026-03-31"
summary: "글 요약"
tags: ["nextjs", "markdown"]
category: "개발"
---
```

## GitHub Pages 배포

1. 저장소 `Settings > Pages` 에서 **Build and deployment** 를 **GitHub Actions** 로 설정
2. `main` 브랜치에 푸시
3. Actions의 `Deploy static blog to GitHub Pages` 워크플로우 확인

저장소명이 `my-blog` 인 경우, 프로덕션 빌드에서 자동으로 `/my-blog` 경로(basePath)가 적용됩니다.
