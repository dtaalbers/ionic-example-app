export class UploadImage {
    /**
     * A identifier
     */
    public guid: string;
    /**
     * The path to the upload image
     */
    public path: string;
    /**
     * The thumbnail of the image
     */
    public thumb: string;
    /**
     * A flag that indicates whether this image is uploaded or not
     */
    public uploaded?: boolean = false;

    public constructor(init?: UploadImage) {
        Object.assign(this, init);
    }
}