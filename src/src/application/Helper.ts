export class Helper {
    /**
    * Creates a unique guid
    * @returns A guid
    */
    public static guid = (): string => {
        return Helper.s4() + Helper.s4() + '-' + Helper.s4() + '-' + Helper.s4() + '-' +
            Helper.s4() + '-' + Helper.s4() + Helper.s4() + Helper.s4();
    }

    /**
     * Generates a random string
     * @returns A random string
     */
    private static s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}