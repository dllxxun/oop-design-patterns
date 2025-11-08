class Singleton {
    private static instance: Singleton | null = null;

    private constructor() {}

    public static getInstance(): Singleton {
        if (Singleton.instance === null) {
            Singleton.instance = new Singleton(); // 최초 1회만 생성
        }
        return Singleton.instance;
    }

    // 예시 메서드
    public say(): string {
        return "lazy로 생성된 싱글톤입니다 👋"; }
}


