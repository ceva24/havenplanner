import { decode, encode } from "@/services/codec";

describe("link codec", () => {
    it("compresses and encodes serialized character data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2}`;

        const encodedData = encode(data);

        expect(encodedData).toEqual(
            "Cx6AeyJuIjoiVGVzdCBDaGFyYWN0ZXIiLCJ4IjoyNDAsImciOjc1LCJkIjoiSXQncyBhIHRlc3QiLCJjIjoyfQM%3D"
        );
    });

    it("compresses and encodes serialized character data with unicode characters", () => {
        const data = `{"n":"テストキャラクター","x":240,"g":75,"d":"こんにちは","c":2}`;

        const encodedData = encode(data);

        expect(encodedData).toEqual(
            "G00A%2BC0O7LYtS1wyXf6I2kg5vidieauFmNg0WRH%2BbjP9QzLJzGSbTQuKBSZ0UkTmphSJKWiIFvkscLDCwo4DNjy8kWQSbPF8UVAySSM7nAw%3D"
        );
    });

    it("decodes and decompresses encoded character data", () => {
        const encodedData =
            "Cx6AeyJuIjoiVGVzdCBDaGFyYWN0ZXIiLCJ4IjoyNDAsImciOjc1LCJkIjoiSXQncyBhIHRlc3QiLCJjIjoyfQM%3D";

        const data = decode(encodedData);

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2}`);
    });

    it("decodes and decompresses encoded character data with unicode characters", () => {
        const encodedData =
            "G00A%2BC0O7LYtS1wyXf6I2kg5vidieauFmNg0WRH%2BbjP9QzLJzGSbTQuKBSZ0UkTmphSJKWiIFvkscLDCwo4DNjy8kWQSbPF8UVAySSM7nAw%3D";

        const data = decode(encodedData);

        expect(data).toEqual(`{"n":"テストキャラクター","x":240,"g":75,"d":"こんにちは","c":2}`);
    });
});
