interface CalculationResult {
    A: number;
    B: number;
    V: number;
    G: number;
    D: number;
    E: number;
    Zh: number;
    I: number;
    Z: number;
    K: number;
    L: number;
    M: number;
    SR: number;
    Nebo: number;
    Zemlya: number;
    MUJCHINA: number;
    ZHENSHINA: number;
    LP: number;
    SP: number;
    DP: number;
    PP: number;
}

export class CalculationService {
    private static reduceToNumber(value: number): number {
        while (value > 22) {
            value = value
                .toString()
                .split('')
                .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        }
        return value;
    }

    static calculateBirthDateData(birthDate: string): CalculationResult {
        const [day, month, year] = birthDate.split('.').map(Number);

        const A = this.reduceToNumber(day);
        const B = this.reduceToNumber(month);
        const V = this.reduceToNumber(year);

        const G = this.reduceToNumber(A + B + V);
        const D = this.reduceToNumber(G + A + B + V);
        const E = this.reduceToNumber(A + B);
        const Zh = this.reduceToNumber(B + V);
        const I = this.reduceToNumber(V + G);
        const Z = this.reduceToNumber(A + G);
        const K = this.reduceToNumber(G + D);
        const L = this.reduceToNumber(V + D);
        const M = this.reduceToNumber(K + L);

        const SR = this.reduceToNumber(E + Zh + I + Z);

        const Nebo = this.reduceToNumber(B + G);
        const Zemlya = this.reduceToNumber(A + V);

        const MUJCHINA = this.reduceToNumber(E + I);
        const ZHENSHINA = this.reduceToNumber(Zh + Z);
        const LP = this.reduceToNumber(Nebo + Zemlya);
        const SP = this.reduceToNumber(MUJCHINA + ZHENSHINA);
        const DP = this.reduceToNumber(LP + SP);
        const PP = this.reduceToNumber(SP + DP);

        return {
            A, B, V, G, D, E, Zh, I, Z, K, L, M, SR,
            Nebo, Zemlya, MUJCHINA, ZHENSHINA, LP, SP, DP, PP
        };
    }
}
