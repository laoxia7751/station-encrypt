declare class StationEncrypt {
    publicUrl: string;
    homePage: string;
    constructor({ publicUrl, homePage, disabledSave, disabledConsole }: {
        publicUrl?: string | undefined;
        homePage?: string | undefined;
        disabledSave?: boolean | undefined;
        disabledConsole?: boolean | undefined;
    });
    /**
     * 包装代码，通过iframe多封装一层
     */
    packingHtml(): Promise<void>;
    /**
     * html包装
     * @param html html模板字符串
     */
    createFrame(html: string): void;
    /**
     * 禁止ctrl+s保存网页
     */
    disabledSave(): void;
    /**
     * 禁止审查元素
     */
    disabledConsole(): void;
}
export default StationEncrypt;
