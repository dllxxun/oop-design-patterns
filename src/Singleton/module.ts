class Service {
    public ping() { return "pong"; }

    // 예시 메서드
    public say(): void {
        console.log("module singleton 실행완료 ");
    }
}

const service = new Service(); // 모듈 캐시로 사실상 싱글톤

//실행 테스트
console.log(service.ping()); // 터미널 출력: pong
service.say();