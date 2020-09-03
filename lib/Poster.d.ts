declare type itemType = "image" | "text";
interface Option {
    canvas: string;
    width?: string;
    height?: string;
    autoRun?: boolean;
    content: Array<PosterItem>;
}
interface PosterItem {
    type: itemType;
    top: string;
    left: string;
    [propName: string]: any;
}
export default class Poster {
    private canvas;
    private context;
    private option;
    private ratio;
    constructor(option: Option);
    private setSize;
    private create;
    private addImage;
    private addText;
    getPixelRatio(context: any): number;
    private setPosition;
}
export {};
