export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        이 블로그는 마크다운으로 작성한 글을 정적 페이지로 빌드해 GitHub Pages에 배포하는 개인 저널입니다.
      </p>
      <p className="leading-8 text-zinc-700 dark:text-zinc-300">
        글은 월별 폴더로 관리되고, 태그와 카테고리 분류를 통해 주제별로 탐색할 수 있습니다. 필요하면 이 페이지를 본인 소개와
        연락처 정보로 자유롭게 확장해보세요.
      </p>
    </section>
  );
}
