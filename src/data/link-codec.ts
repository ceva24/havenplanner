import * as zlib from "node:zlib";
import { Buffer } from "node:buffer";

const encodeShareableLinkData = (data: string): string => {
    const compressedData: Buffer = zlib.brotliCompressSync(data);

    return compressedData.toString("base64");
};

const decodeShareableLinkData = (encodedCompressedData: string): string => {
    const compressedData: string = Buffer.from(encodedCompressedData, "base64").toString("latin1");

    const compressedDataArray: Uint8Array = Uint8Array.from(
        compressedData.split("").map((character: string) => {
            const codePoint = character.codePointAt(0);

            if (typeof codePoint === "undefined") {
                throw new TypeError(
                    `Unexpected decoding error: unable to determine code point for character '${character}'`
                );
            }

            return codePoint;
        })
    );

    const dataBuffer: Buffer = zlib.brotliDecompressSync(Buffer.from(compressedDataArray));

    return dataBuffer.toString("utf8");
};

export { encodeShareableLinkData, decodeShareableLinkData };
