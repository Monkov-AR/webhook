import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {

    createBubble(cardInfo): any {
        return {
            type: "bubble",
            hero: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "image",
                        url: cardInfo.heroImgUrl,
                        size: "full",
                        aspectRatio: "21:14",
                    },
                ],
            },
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: cardInfo.title,
                        weight: "bold",
                        size: "xl",
                    },
                    {
                        type: "text",
                        text: cardInfo.companyName,
                        size: "sm",
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        margin: "lg",
                        spacing: "sm",
                        contents: [
                            {
                                type: "box",
                                layout: "baseline",
                                contents: [
                                    {
                                        type: "text",
                                        text: "給与",
                                        color: "#aaaaaa",
                                        flex: 1,
                                        size: "sm",
                                    },
                                    {
                                        type: "text",
                                        text: cardInfo.salary,
                                        flex: 3,
                                        size: "sm",
                                        margin: "md",
                                    },
                                ],
                            },
                            {
                                type: "box",
                                layout: "baseline",
                                contents: [
                                    {
                                        type: "text",
                                        text: "スキル",
                                        color: "#aaaaaa",
                                        size: "sm",
                                        flex: 1,
                                    },
                                    {
                                        type: "text",
                                        text: cardInfo.skills,
                                        wrap: true,
                                        flex: 3,
                                        size: "sm",
                                        margin: "md",
                                    },
                                ],
                            },
                            {
                                type: "box",
                                layout: "baseline",
                                contents: [
                                    {
                                        type: "text",
                                        text: "勤務地",
                                        color: "#aaaaaa",
                                        size: "sm",
                                        flex: 1,
                                    },
                                    {
                                        type: "text",
                                        text: cardInfo.address,
                                        wrap: true,
                                        flex: 3,
                                        size: "sm",
                                        margin: "md",
                                    },
                                ],
                            },
                            {
                                type: "box",
                                layout: "baseline",
                                contents: [
                                    {
                                        type: "text",
                                        text: "雇用形態",
                                        color: "#aaaaaa",
                                        size: "sm",
                                        flex: 1,
                                    },
                                    {
                                        type: "text",
                                        text: cardInfo.vacansyType,
                                        wrap: true,
                                        flex: 3,
                                        size: "sm",
                                        margin: "md",
                                    },
                                ],
                            },
                            {
                                type: "box",
                                layout: "baseline",
                                contents: [
                                    {
                                        type: "text",
                                        text: "日本語",
                                        color: "#aaaaaa",
                                        size: "sm",
                                        flex: 1,
                                    },
                                    {
                                        type: "text",
                                        text: cardInfo.japaneseLevel,
                                        wrap: true,
                                        flex: 3,
                                        size: "sm",
                                        margin: "md",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            footer: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "button",
                        action: {
                            type: "uri",
                            label: "show on website",
                            uri: "https://linecorp.com",
                        },
                        height: "sm",
                        style: "primary",
                    },
                ],
            },
        };
    }

    createCarousel(vacanciesList): any {
        const bubbles = vacanciesList.map((bubble) => {
            return this.createBubble(bubble);
        });
        const carousel = {
            type: "carousel",
            contents: bubbles,
        };

        return carousel;
    }

    createMessage(vacanciesList): any {
        const message = {
            type: "flex",
            altText: "this is a flex message",
            contents: this.createCarousel(vacanciesList),
        };
        return message;
    }
}
