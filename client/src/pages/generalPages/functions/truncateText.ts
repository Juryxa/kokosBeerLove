export const truncateText = (text: string, charLimit: number): string => {
    if (text.length > charLimit) {
        return text.slice(0, charLimit) + '...';
    }
    return text;
};