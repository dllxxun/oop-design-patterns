class ServiceA {
    operationA(): string {
        return "Service A 작업 완료";
    }
}

class ServiceB {
    operationB(): string {
        return "Service B 작업 완료";
    }
}

export class Facade {
    private serviceA: ServiceA;
    private serviceB: ServiceB;

    constructor() {
        this.serviceA = new ServiceA();
        this.serviceB = new ServiceB();
    }

    public doComplexTask(): string {
        // 여러 서비스 작업을 하나로 감싸서 단순화
        const resultA = this.serviceA.operationA();
        const resultB = this.serviceB.operationB();
        return `${resultA} + ${resultB} => Facade 단순 작업 완료`;
    }
}
