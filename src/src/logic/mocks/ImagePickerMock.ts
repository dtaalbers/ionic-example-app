export class ImagePickerMock {
    /**
     * Get pictures from albums
     */
    public getPictures(): Promise<Array<string>> {
        return Promise.resolve([
            'https://www.kenyabuzz.com/media/image-uploads/2016/04/27/landscape-1457107485-gettyimages-512366437.jpg',
            'http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg',
            'http://inanutshell.ca/wp-content/uploads/2014/11/Gorgeous_puppies.jpg'
        ]);
    }
}