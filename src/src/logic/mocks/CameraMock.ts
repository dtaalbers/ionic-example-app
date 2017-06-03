/**
 * This class mocks the cordova camera plugin on devices
 */
export class CameraMock {
    /**
     * Get a picture
     */
    public getPicture(): Promise<string> {
        return Promise.resolve('https://www.kenyabuzz.com/media/image-uploads/2016/04/27/landscape-1457107485-gettyimages-512366437.jpg');
    }
}