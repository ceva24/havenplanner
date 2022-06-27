import * as zlib from "node:zlib";
import { Buffer } from "node:buffer";

const encode = (data: string): string => {
    const compressedData: Buffer = zlib.brotliCompressSync(data);

    const base64Data = compressedData.toString("base64");

    return encodeURIComponent(base64Data);
};

const decode = (encodedCompressedData: string): string => {
    const uriDecodedData = decodeURIComponent(encodedCompressedData);

    const compressedData: string = Buffer.from(uriDecodedData, "base64").toString("latin1");

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

export { encode, decode };
