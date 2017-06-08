import { ImageResizerOptions } from "@ionic-native/image-resizer";

export class ImageResizerMock {

    /**
     * Resizes an image
     * @param options The resize options
     */
    public resize(options: ImageResizerOptions): Promise<any> {
        return Promise.resolve(options.uri);
    }
}