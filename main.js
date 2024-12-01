const fs = require('fs');
const path = require('path');

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getWeekNumber = (dateStr) => {
    const date = new Date(dateStr);
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.ceil((days + startDate.getDay() + 1) / 7);
};

const createMdFile = (folder, mdFile) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`创建文件夹: ${folder}`);
    }

    const mdFilePath = path.join(folder, mdFile);

    if (!fs.existsSync(mdFilePath)) {
        const templateFilePath = './Utils/Template.md';
        if (!fs.existsSync(templateFilePath)) {
            console.log('模板文件 template.md 不存在！');
            return;
        }

        const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
        fs.writeFileSync(mdFilePath, templateContent);
        console.log(`创建文件: ${mdFilePath}`);
    } else {
        console.log(`文件已存在: ${mdFilePath}`);
    }
};

(() => {
    const currentDate = getCurrentDate();
    console.log(`当前日期: ${currentDate}`);

    const [year, month, day] = currentDate.split('-').map(Number);

    const folder = `${year}-${String(month).padStart(2, '0')}`;

    const weekNumber = getWeekNumber(currentDate);
    console.log(`当前周数: W${weekNumber}`);

    const mdFile = `W${weekNumber}.md`;

    createMdFile(folder, mdFile);
})();