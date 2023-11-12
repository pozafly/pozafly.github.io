module.exports = {
  ci: {
    collect: {
      staticDistDir: './public', // 정적 파일 경로 작성. 해당 경로의 html 파일을 통해 성능을 측정한다.
      // startServerCommand: "npm run start", // 정적 사이트가 아닌 경우, 서버를 켜는 명령어 작성.
      url: ['http://localhost:3000'], // 성능을 측정할 url을 배열 형태로 작성. 즉, 여러 개의 url 가능.
      numberOfRuns: 3, // LightHouse가 실행되는 횟수. 동일 코드 사이트라 하더라도 네트워크 등 다르게 나올 수 있음. default는 3임.
    },
    upload: {
      // 보고서 저장 위치. 7일동안 유지됨.
      target: 'temporary-public-storage',
    },
    // 빌드 실패하기
    asserts: {
      assertions: {
        // performance 카테고리 점수가 90점 미만이면 warning
        'categories:performance': ['warn', { minScore: 0.9 }],
        // accessibility 가 100점 미만이면 error
        'categories:accessibility': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
