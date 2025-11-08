// 싱글톤 클래스 정의
class Singleton { // TS 4.4 이상
    private static instance: Singleton;

    private constructor() {}

    static {
        try {
            Singleton.instance = new Singleton();
            console.log("✅ 싱글톤 인스턴스가 정상적으로 생성되었습니다.");
        } catch (error) {
            throw new Error("싱글톤 객체 생성 오류");
        }
    }

    public static getInstance(): Singleton {
        return Singleton.instance;
    }

    // 테스트용 메서드
    public greet(): void {
        console.log("안녕하세요! 저는 static block으로 생성된 싱글톤입니다 👋");
    }
}

// ------------------ 사용 예시 ------------------

// 1. 인스턴스 가져오기
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

// 2. 메서드 호출
s1.greet(); // 출력: 안녕하세요! 저는 static block으로 생성된 싱글톤입니다 👋

// 3. 같은 객체인지 확인
console.log(s1 === s2); // true (항상 같은 인스턴스)