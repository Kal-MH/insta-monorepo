## Instagra Clone Coding (Web)

- 배포 주소: [https://insta-monorepo-web.vercel.app/](https://insta-monorepo-web.vercel.app/)

### 기능

instagram을 모방하여 간단한 SNS 기능의 웹 서비스를 제공합니다.

1. 로그인, 회원가입
   1. 사용자는 계정을 생성할 수 있습니다
   2. 생성한 계정으로 사용자는 로그인할 수 있습니다.
2. 피드 확인하기
   1. 사용자는 팔로잉하는 사람의 게시물 혹은 자신이 올린 게시글의 피드를 확인할 수 있습니다.
   2. 각각의 게시글에서 좋아요를 남길 수 있고, 각 게시글에 한 개의 좋아요만 남길 수 있습니다.
   3. 사용자는 게시글에 댓글을 남길 수 있고, 삭제가 가능합니다.
   4. 사용자가 남긴 게시글의 태그를 타고, 다른 게시글 검색 결과를 확인할 수 있습니다
3. 프로필 확인하기
   1. 사용자는 다른 사람의 프로필 및 올린 게시글 목록을 프로필 페이지에서 확인이 가능합니다.
   2. 해당 프로필 사용자를 팔로우 혹은 팔로우 취소를 할 수 있습니다.
4. 게시글 검색하기
   1. 사이드바에 검색 기능을 통해서 게시글을 검색할 수 있습니다.

제공하는 페이지는 다음과 같습니다.

- `/` : 홈(피드)
- `/login` , `/sign-up` : 로그인, 회원가입
- `/users/:username` : 프로필 페이지
- `/explore` : 검색 페이지

### 시연 영상

#### Home(Feed)

![front_v2_home6](https://github.com/user-attachments/assets/d4598d5d-0d02-4d6d-96bd-b165650db29c)

#### Profile

![front_v2_modal_profile](https://github.com/user-attachments/assets/8f391c96-4e6c-4110-afd2-930d454a8a3c)

#### 반응형

![front_v2_responsive5](https://github.com/user-attachments/assets/5c9febea-d435-46f5-8d97-ed162809161a)

### web service 실행 방법

monorepo 환경으로 가장 바깥 레포지토리에 각 service에 대한 script가 정의되어 있습니다.

```jsx
 "scripts": {
    "design-system": "yarn workspace @insta-monorepo/design-system",
    "web": "yarn workspace @insta-monorepo/web",
    ...
  },
```

1. 모든 패키지 설치

   ```jsx
   yarn web
   ```

2. env 파일 web 레포지토리 안에 작성

   ```jsx
   // /web/.env

   VITE_SERVER_DOMAIN_URL = YOUR_SERVER_DOMAIN_URL;
   ```

3. 실행

   ```jsx
   yarn web run dev
   ```

### 기술 스택

```
"react": "^18.3.1",
"typescript": "^5.5.3",
"react-router-dom": "^6.26.1",
"react-hook-form": "^7.52.2",
"@apollo/client": "^3.11.4",
"graphql": "^16.9.0",
"styled-components": "^6.1.12",
"vite": "^5.4.1",
```

### 파일 구조

```jsx
|- pages
		|- home
				|- components
				|- hooks //해당 페이지 Network요청
				|- tests
				|- Home.tsx
	...
|- components
		|- Avatar.tsx
		|- Header.tsx
		...
|- layouts
			|- CommonLayouts.tsx
			...
|- __generated__
		|- graphql.tsx
|- apollo
		|- apollo.ts
		|- fragments.ts
		|- query
				|- user.ts //fragment를 합쳐도 될 듯
				|- photo.ts
				|- comment.ts
|- helpers
		|- useQuery.ts
		|- useMutation.ts
		|- useLoadMore.ts
|- utils
		|- test
				|- setUpTests.js
				|- render.js
		|- localStorage.ts
|- apiRoutes.ts
|- router.tsx
|- styles.ts
|- styled.d.ts
|- main.tsx
```
