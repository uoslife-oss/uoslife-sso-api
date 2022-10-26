export const tags: SwaggerTag[] = [
  { name: '[인증] 계정 인증', description: '사용자 계정을 이용해 인증합니다.' },
  { name: '[인증] 기기 인증', description: '사용자 기기를 이용해 인증합니다.' },
  { name: '[사용자] 계정', description: '계정 정보와 관련된 부분을 다룹니다.' },
  { name: '[사용자] 계정 인증', description: '계정의 인증 상태를 다룹니다.' },
  { name: '[사용자] 기기', description: '계정에 등록된 기기를 다룹니다.' },
];

type SwaggerTag = { name: string; description: string };
