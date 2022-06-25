import { decode, encode } from "@/services/codec";

describe("link code", () => {
    it("compresses and encodes serialized character data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2}`;

        const encodedData = encode(data);

        expect(encodedData).toEqual(
            "Cx6AeyJuIjoiVGVzdCBDaGFyYWN0ZXIiLCJ4IjoyNDAsImciOjc1LCJkIjoiSXQncyBhIHRlc3QiLCJjIjoyfQM="
        );
    });

    it("compresses and encodes serialized character data with unicode characters", () => {
        const data = `{"n":"テストキャラクター","x":240,"g":75,"d":"こんにちは","c":2}`;

        const encodedData = encode(data);

        expect(encodedData).toEqual(
            "G00A+C0O7LYtS1wyXf6I2kg5vidieauFmNg0WRH+bjP9QzLJzGSbTQuKBSZ0UkTmphSJKWiIFvkscLDCwo4DNjy8kWQSbPF8UVAySSM7nAw="
        );
    });

    it("decodes and decompresses encoded character data", () => {
        const encodedData = "Cx6AeyJuIjoiVGVzdCBDaGFyYWN0ZXIiLCJ4IjoyNDAsImciOjc1LCJkIjoiSXQncyBhIHRlc3QiLCJjIjoyfQM=";

        const data = decode(encodedData);

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2}`);
    });

    it("decodes and decompresses encoded character data with unicode characters", () => {
        const encodedData =
            "G00A+C0O7LYtS1wyXf6I2kg5vidieauFmNg0WRH+bjP9QzLJzGSbTQuKBSZ0UkTmphSJKWiIFvkscLDCwo4DNjy8kWQSbPF8UVAySSM7nAw=";

        const data = decode(encodedData);

        expect(data).toEqual(`{"n":"テストキャラクター","x":240,"g":75,"d":"こんにちは","c":2}`);
    });
});
