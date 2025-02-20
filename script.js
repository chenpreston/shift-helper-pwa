// script.js 文件

console.log("script.js 文件正在运行..."); // 页面加载时在控制台输出信息，确认 script.js 文件已加载

document.addEventListener('DOMContentLoaded', function() {
    //  当 HTML 文档完全加载完成后执行的代码

    console.log("DOMContentLoaded 事件触发，DOM 已加载完成");

    // 1. 获取 DOM 元素 (getElementById)
    const schoolHolidaySwitch = document.getElementById('school-holiday-switch'); // 学校假期开关
    const greertonDepotButton = document.getElementById('greerton-depot'); // Greerton DEPOT 按钮
    const papamoaDepotButton = document.getElementById('papamoa-depot'); // Papamoa DEPOT 按钮
    const malemeDepotButton = document.getElementById('maleme-depot'); // Maleme DEPOT 按钮
    const backToDepotSelectionButton = document.getElementById('back-to-depot-selection'); // "返回" 按钮

    const depotSelectionUI = document.getElementById('depot-selection-ui'); // DEPOT 选择界面容器
    const weekDateSelector = document.getElementById('week-date-selector'); // 日期选择器 section 元素
    const weekStartDateInput = document.getElementById('week-start-date'); // 日期 input 元素

    const scheduleWeekView = document.getElementById('schedule-week-view'); // **新增: 获取 日期列表视图 section 元素**
    const backToDateSelectorButton = document.getElementById('back-to-date-selector-button'); // **新增: 获取 "返回" 按钮 (日期列表视图 页面)**
    const addToCalendarButton = document.getElementById('add-to-calendar-button'); // **新增: 获取 "添加到日历" 按钮**
    
    // 2. 学校假期开关交互 (占位功能，后续完善)
    schoolHolidaySwitch.addEventListener('change', function(event) {
        isSchoolHolidayEnabled = event.target.checked; //  更新 School Holiday 开关状态变量
        const isSchoolHoliday = event.target.checked; // 获取开关状态 (true=选中, false=未选中)
        console.log("School Holiday Switch 状态改变:", isSchoolHoliday);
        //  后续完善：  根据开关状态，更新排班逻辑或界面显示

        //  **新增:  当 School Holiday 开关状态改变时， 重新填充日期列表视图的下拉菜单选项**
        if (scheduleWeekView.style.display === 'block') { //  如果日期列表视图当前是显示的
            updateShiftOptionsInTableView(); //  调用函数重新更新下拉菜单选项 (函数定义见下方)
        }
    });


// **9. “添加到日历” 按钮  点击事件监听器**
addToCalendarButton.addEventListener('click', function() {
    console.log("“添加到日历” 按钮被点击了"); // 调试信息 -  按钮点击时， 在控制台输出信息

    // **1. 获取排班表格的 <tbody> 元素**
const scheduleTableBody = scheduleWeekView.querySelector('tbody'); // 获取 <tbody> 元素
if (!scheduleTableBody) { // **安全检查： 确保 <tbody> 元素存在**
    console.error("找不到排班表格的 <tbody> 元素！");
    return; // 如果找不到 <tbody> 元素， 提前结束函数执行， 避免后续代码出错
}

// **2. 获取 <tbody> 元素中的所有数据行 (<tr> 元素)**
const scheduleRows = scheduleTableBody.querySelectorAll('tr'); // 获取 <tbody> 中所有的 <tr> 元素
if (!scheduleRows || scheduleRows.length === 0) { // **安全检查： 确保 找到至少一行数据行**
    console.warn("排班表格 <tbody> 中没有找到任何数据行 (<tr>)！"); // 使用 console.warn 输出警告信息
    return; // 如果找不到数据行， 提前结束函数执行
}

console.log("找到排班表格数据行 (<tr>) 数量:", scheduleRows.length); // 调试信息： 输出找到的数据行数量

// **5.1. 创建数组存储排班数据**
const shiftEvents = []; // 初始化一个空数组，用于存储排班事件数据

// **3. 循环遍历 数据行 <tr>， 提取每一行的日期和班次信息**
scheduleRows.forEach(row => { // 使用 forEach 循环遍历每一行 <tr> 元素
    console.log("--- 开始处理一行数据 (<tr>) ---"); // 调试信息 -  标记开始处理新的一行数据

    // **3.2. 在每一行 <tr> 中， 获取 日期 和 班次的 <td> 元素**
    const dateCell = row.querySelectorAll('td')[0]; // 获取当前行 <tr> 中索引为 1 的 <td> 元素 (日期单元格)
    const shiftCell = row.querySelectorAll('td')[1]; // 获取当前行 <tr> 中索引为 2 的 <td> 元素 (班次单元格)

    if (!dateCell || !shiftCell) { // **安全检查： 确保 日期单元格 和 班次单元格 都存在**
        console.warn("  当前行 (<tr>) 中， 找不到日期单元格 (<td>) 或 班次单元格 (<td>)！ 跳过处理当前行。"); // 使用 console.warn 输出警告信息
        return; // 如果找不到 日期单元格 或 班次单元格， 提前结束当前行的处理， 继续处理下一行
    }

    console.log("  找到日期单元格 (<td>):", dateCell); // 调试信息 -  输出日期单元格 <td> 元素
    console.log("  找到班次单元格 (<td>):", shiftCell); // 调试信息 -  输出班次单元格 <td> 元素

    // **3.3. 从日期单元格 <td> 中提取日期值**
                const dateText = dateCell.textContent.trim(); // 获取日期单元格 <td> 的文本内容，并去除首尾空格
                console.log("    提取到的日期文本:", dateText); // 调试信息 - 输出提取到的日期文本

                // **3.4. 从班次单元格 <td> 中提取班次选择值**
                const shiftSelector = shiftCell.querySelector('select.shift-selector'); // 在班次单元格 <td> 内查找 <select class="shift-selector"> 元素
                if (!shiftSelector) { // **安全检查： 确保 在班次单元格中找到 <select> 元素**
                    console.warn("    在班次单元格 (<td>) 中， 找不到 <select class='shift-selector'> 元素！ 跳过处理当前行。"); // 使用 console.warn 输出警告信息
                    return; // 如果找不到 <select> 元素， 提前结束当前行的处理， 继续处理下一行
                }

                const selectedShiftValue = shiftSelector.value; // 获取 <select> 元素的当前选中的 value 值 (班次代码)
                console.log("    提取到的班次选择值:", selectedShiftValue); // 调试信息 - 输出提取到的班次选择值

                // **5.2. 创建对象存储每一天的排班数据，并添加到 shiftEvents 数组**
                const eventData = { // 创建一个对象，存储当前行的排班数据
                    date: dateText,          // 存储日期文本
                    shiftCode: selectedShiftValue // 存储班次选择值
                };
                shiftEvents.push(eventData);   // 将当前行的排班数据对象 添加到 shiftEvents 数组中
                console.log("    当前行排班数据对象:", eventData); // 调试信息 - 输出当前行排班数据对象
                console.log("    shiftEvents 数组当前内容:", shiftEvents); // 调试信息 - 输出 shiftEvents 数组的当前内容
            

    //  后续步骤：  将在下方继续添加代码，  从日期和班次单元格中  提取数据
});

// **4. 生成 iCalendar (.ics) 文件内容**
let icsContent = "";
            icsContent += "BEGIN:VCALENDAR\r\n";
            icsContent += "VERSION:2.0\r\n";
            icsContent += "PRODID:-//Your Organization//Your Application//EN\r\n";
            icsContent += "CALSCALE:GREGORIAN\r\n";
            icsContent += "METHOD:PUBLISH\r\n";


            // **5.3. 循环遍历 shiftEvents 数组， 动态生成 VEVENT 事件**
            shiftEvents.forEach(event => { // 循环遍历 shiftEvents 数组， event 参数代表当前循环到的排班数据对象
                console.log("  --- 开始为排班数据对象生成 VEVENT 事件 ---", event); // 调试信息 - 标记开始为当前排班数据对象生成 VEVENT 事件

                const shiftCode = event.shiftCode; // 从排班数据对象中 获取班次代码
                const dateText = event.date;       // 从排班数据对象中 获取日期文本

                icsContent += "BEGIN:VEVENT\r\n"; // 添加 VEVENT 开始标记

                // **5.3.1. 生成 UID -  使用 UUID 算法生成唯一 ID**
                const uid = generateUuid(); // 调用 generateUuid() 函数生成 UUID
                icsContent += `UID:${uid}\r\n`;   // 添加 UID 属性， 值为生成的 UUID
                console.log("    生成的 UID:", uid); // 调试信息 - 输出生成的 UID

                // **5.3.2. 生成 DTSTAMP -  使用当前时间**
                const now = new Date(); // 创建 Date 对象，表示当前日期和时间
                const dtstamp = formatDateTimeToUTCString(now); // 调用 formatDateTimeToUTCString() 函数格式化当前时间为 UTC 字符串
                icsContent += `DTSTAMP:${dtstamp}\r\n`; // 添加 DTSTAMP 属性， 值为当前时间的 UTC 字符串
                console.log("    生成的 DTSTAMP:", dtstamp); // 调试信息 - 输出生成的 DTSTAMP

                // **5.3.3. 生成 DTSTART 和 DTEND -  根据班次代码和日期文本， 从 shiftDetailsDictionary 中查找时间段**
                const shiftDetails = shiftDetailsDictionary[shiftCode]; // 根据班次代码， 从 shiftDetailsDictionary 中查找班次详情
                if (shiftDetails && shiftDetails.timeRanges && shiftDetails.timeRanges.length > 0) { // **判断  是否  找到班次详情，  并且  timeRanges 属性存在  且  不为空**
                    shiftDetails.timeRanges.forEach(timeRange => { // 循环遍历 timeRanges 数组 (一个班次可能有多段时间段)
                        const [startTimeStr, endTimeStr] = timeRange.split('-'); // 将时间段字符串 (例如 "07:07-11:49")  分割为 开始时间和结束时间字符串

                        const startDateTime = createUTCDateFromDateTextAndTime(dateText, startTimeStr); // 调用 createUTCDateFromDateTextAndTime() 函数， 将日期文本和开始时间字符串 转换为 UTC Date 对象
                        const endDateTime = createUTCDateFromDateTextAndTime(dateText, endTimeStr);   // 调用 createUTCDateFromDateTextAndTime() 函数， 将日期文本和结束时间字符串 转换为 UTC Date 对象

                        if (startDateTime && endDateTime) { // **判断  开始时间和结束时间 Date 对象  是否  成功创建**
                            const dtstart = formatDateTimeToUTCString(startDateTime); // 格式化 开始时间 Date 对象 为 UTC 字符串
                            const dtend = formatDateTimeToUTCString(endDateTime);     // 格式化 结束时间 Date 对象 为 UTC 字符串
                            console.log(`创建 DTSTART: ${dtstart} (原始: ${startDateTime.toISOString()})`);
                            console.log(`创建 DTEND: ${dtend} (原始: ${endDateTime.toISOString()})`);
                            
                            icsContent += `DTSTART:${dtstart}\r\n`; // 添加 DTSTART 属性， 值为 开始时间的 UTC 字符串
                            icsContent += `DTEND:${dtend}\r\n`;     // 添加 DTEND 属性， 值为 结束时间的 UTC 字符串

                            console.log(`    时间段: ${timeRange}`); // 调试信息 - 输出时间段字符串
                            console.log("      生成的 DTSTART:", dtstart); // 调试信息 - 输出生成的 DTSTART
                            console.log("      生成的 DTEND:", dtend);   // 调试信息 - 输出生成的 DTEND
                        } else { // 如果  开始时间 或 结束时间 Date 对象 创建失败
                            console.warn(`    警告:  时间段 "${timeRange}" 的 开始时间或结束时间 Date 对象创建失败!  跳过当前时间段.`); // 输出警告信息
                        }

                    }); // shiftDetails.timeRanges.forEach(timeRange => { ... }); 循环结束
                } else { // 如果  shiftDetailsDictionary 中  没有找到  当前班次代码的详情  或  timeRanges 属性不存在 或 为空
                    console.warn(`    警告:  班次代码 "${shiftCode}" 在 shiftDetailsDictionary 中找不到详情 或 没有定义时间段!  跳过添加时间段.`); // 输出警告信息
                }


                // **5.3.4. 生成 SUMMARY -  使用班次代码**
                icsContent += `SUMMARY:${shiftCode}\r\n`; // 添加 SUMMARY 属性， 值为班次代码
                console.log("    生成的 SUMMARY:", shiftCode); // 调试信息 - 输出生成的 SUMMARY

                // **5.3.5. 生成 DESCRIPTION - 使用班次详情 (用餐地点, 用餐时间)**
                let description = ""; // 初始化一个空字符串，用于存储 DESCRIPTION 内容
if (shiftDetails) { // **判断  是否  找到班次详情**
    description += `用餐地点: ${shiftDetails.mealLocation || '无'}， 用餐时间: ${shiftDetails.mealTime || '无'}\n`; // 添加 用餐地点 和 用餐时间， 使用逗号+空格分隔，并换行
} else { // 如果  shiftDetailsDictionary 中  没有找到  当前班次代码的详情
    description += `班次代码 "${shiftCode}" 详情未找到.\n`; // 添加 提示信息， 说明班次详情未找到
}
icsContent += `DESCRIPTION:${description}\r\n`; // 添加 DESCRIPTION 属性， 值为生成的描述字符串
console.log("    生成的 DESCRIPTION:", description); // 调试信息 - 输出生成的 DESCRIPTION

                icsContent += "END:VEVENT\r\n"; // 添加 VEVENT 结束标记
                console.log("  --- VEVENT 事件生成完成 ---"); // 调试信息 - 标记 VEVENT 事件生成完成

            }); //  shiftEvents.forEach(event => { ... }); 循环 结束


// **4.3. 添加 iCalendar 文件尾**
icsContent += "END:VCALENDAR\r\n";   // 添加 VCALENDAR 结束标记


console.log("生成的 .ics 文件内容:\n", icsContent); // 调试信息 -  输出生成的 .ics 文件内容到控制台

// **6. 触发 .ics 文件下载**

// **7. 增强用户体验 - 按钮状态变化**
addToCalendarButton.textContent = "正在生成日历文件..."; // **点击按钮后， 修改按钮文本为 "正在生成日历文件..."**

            // **6.1. 创建 Blob 对象 - 将 .ics 文件内容转换为 Blob**
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' }); // 创建 Blob 对象，MIME type 设置为 text/calendar

            // **6.2. 创建下载链接 (URL)**
            const downloadUrl = URL.createObjectURL(blob); // 使用 URL.createObjectURL() 方法创建 Blob 对象的 URL

            // **6.3. 创建 <a> 元素 (download link)**
            const downloadLink = document.createElement('a'); // 创建 <a> 元素
            downloadLink.href = downloadUrl;          // 设置 <a> 元素的 href 属性为 Blob URL
            downloadLink.download = '排班日历.ics';     // 设置 <a> 元素的 download 属性，指定下载文件名 (例如 "排班日历.ics")

            downloadLink.style.display = 'none';     // **(可选) 设置 <a> 元素样式为隐藏，使其不显示在页面上**  (可以省略这行， 如果你想显示下载链接)

            // **6.4. 将 <a> 元素添加到 body 中**
            document.body.appendChild(downloadLink); // 将 <a> 元素添加到 document.body 中

            // **6.5. 模拟点击 <a> 元素，触发文件下载**
            downloadLink.click(); // 模拟点击 <a> 元素，触发文件下载

            // **6.6. (可选)  下载完成后， 移除 <a> 元素， 并 释放 Blob URL**
            document.body.removeChild(downloadLink); // 将 <a> 元素从 document.body 中移除
            URL.revokeObjectURL(downloadUrl);      // 释放 Blob URL， 释放内存

            console.log("已触发 .ics 文件下载"); // 调试信息 -  输出 "已触发 .ics 文件下载" 信息到控制台

             // **7. 增强用户体验 - 按钮状态变化 (下载完成后恢复按钮文本)**
             addToCalendarButton.textContent = "添加到日历"; // **下载触发后， 将按钮文本恢复为 "添加到日历"**
            //  “添加到日历” 按钮 点击事件处理函数  代码结束


    //  后续步骤：  在这里编写  生成 .ics 文件  并  下载的代码
});

    // 3. DEPOT 按钮点击事件 - 添加点击事件监听器 (显示日期选择器，隐藏DEPOT选择界面)
    greertonDepotButton.addEventListener('click', function() {
        console.log("Greerton DEPOT 按钮被点击了");
        currentDepot = "depot1"; // **更新当前 DEPOT 选择为 "depot1" (或者你定义的键名)**
        //  后续完善：  记录选择的 DEPOT (例如 Greerton)

        depotSelectionUI.style.display = 'none'; // 隐藏 DEPOT 选择 UI 容器
        weekDateSelector.style.display = 'block'; // 显示日期选择器 section
        scheduleWeekView.style.display = 'none'; // **新增: 确保日期列表视图 初始状态是隐藏的**
    });

    papamoaDepotButton.addEventListener('click', function() {
        console.log("Papamoa DEPOT 按钮被点击了");
        currentDepot = "depot2"; // **更新当前 DEPOT 选择为 "depot2" (或者你定义的键名)**
        //  后续完善：  记录选择的 DEPOT (例如 Papamoa)

        depotSelectionUI.style.display = 'none'; // 隐藏 DEPOT 选择 UI 容器
        weekDateSelector.style.display = 'block'; // 显示日期选择器 section
        scheduleWeekView.style.display = 'none'; // **新增: 确保日期列表视图 初始状态是隐藏的**
    });

    malemeDepotButton.addEventListener('click', function() {
        console.log("Maleme DEPOT 按钮被点击了");
        currentDepot = "depot3"; // **更新当前 DEPOT 选择为 "depot3" (或者你定义的键名)**
        //  后续完善：  记录选择的 DEPOT (例如 Maleme)

        depotSelectionUI.style.display = 'none'; // 隐藏 DEPOT 选择 UI 容器
        weekDateSelector.style.display = 'block'; // 显示日期选择器 section
        scheduleWeekView.style.display = 'none'; // **新增: 确保日期列表视图 初始状态是隐藏的**
    });


    // 4.  "返回" 按钮点击事件 - 添加点击事件监听器 (显示DEPOT选择界面，隐藏日期选择器和日期列表视图)
    backToDepotSelectionButton.addEventListener('click', function() {
        console.log("返回 按钮被点击了");

        depotSelectionUI.style.display = 'block'; // 显示 DEPOT 选择 UI 容器
        weekDateSelector.style.display = 'none'; // 隐藏日期选择器 section
        scheduleWeekView.style.display = 'none'; // **新增: 隐藏日期列表视图 section**
    });


    // 5.  日期选择器  日期选择完成事件 -  监听  weekStartDateInput 的 'change' 事件
    weekStartDateInput.addEventListener('change', function(event) {
        const selectedDate = event.target.value; // 获取用户选择的日期值 (YYYY-MM-DD 格式字符串)
        console.log("用户在日期选择器中选择了日期:", selectedDate);

        // **新增:  日期选择完成后，隐藏日期选择器，显示日期列表视图**
        weekDateSelector.style.display = 'none'; // 隐藏日期选择器 section
        scheduleWeekView.style.display = 'block'; // 显示日期列表视图 section

        // **新增:  动态填充日期列表视图表格的 "日期" 列**
        const startDate = new Date(selectedDate); // 将YYYY-MM-DD 字符串转换为 Date 对象
        const dayOfWeek = startDate.getDay(); // 获取选择日期是星期几 (0-周日, 6-周六)
        const sundayDate = new Date(startDate); // 创建一个新的 Date 对象，避免修改原日期
        sundayDate.setDate(startDate.getDate() - dayOfWeek); // 将日期设置为这周的周日

        const dateCells = scheduleWeekView.querySelectorAll('tbody tr td:nth-child(2)'); // 获取表格中 "日期" 列的所有 <td> 单元格 (注意: 第2列是日期列)

        for (let i = 0; i < dateCells.length; i++) { // 循环遍历 7 个日期单元格 (周日到周六)
            const currentDate = new Date(sundayDate); // 创建一个新的 Date 对象，避免修改周日日期
            currentDate.setDate(sundayDate.getDate() + i); //  在周日的基础上，依次增加 i 天，得到周一，周二...周六的日期

            const formattedDate = String(currentDate.getDate()).padStart(2, '0') + "/" + String(currentDate.getMonth() + 1).padStart(2, '0'); // 格式化日期为 DD/MM 形式 (例如 01/01)

            dateCells[i].textContent = formattedDate; // 将格式化后的日期字符串填充到对应的 <td> 单元格中
        }

        // **新增:  动态填充日期列表视图表格的 "Shift" 列下拉菜单选项**
        updateShiftOptionsInTableView(); //  调用函数更新下拉菜单选项 (函数定义见下方)

        //  后续完善：  根据选择的日期，加载或生成排班数据，并更新日期列表视图
    });


    // 6.  "返回" 按钮点击事件 - 添加点击事件监听器 (显示日期选择器，隐藏日期列表视图) -  日期列表视图 页面 "返回" 按钮
    backToDateSelectorButton.addEventListener('click', function() { // **新增:  日期列表视图 页面 "返回" 按钮  点击事件监听器**
        console.log("返回 按钮 (日期列表视图 页面) 被点击了");

        weekDateSelector.style.display = 'block'; // 显示日期选择器 section
        scheduleWeekView.style.display = 'none'; // 隐藏日期列表视图 section
    });


    //  7.  日期格式化函数 (YYYY-MM-DD 格式字符串  转换为  中文日期格式  例如 "2024年1月1日") -  **无需修改，保留**
    function formatDateToChinese(dateString) {
        const date = new Date(dateString); // 使用 Date 构造函数将YYYY-MM-DD 字符串转换为 Date 对象
        const year = date.getFullYear();   // 获取年份
        const month = date.getMonth() + 1; // 获取月份 (getMonth() 返回 0-11，需要 +1)
        const day = date.getDate();      // 获取日期

        return year + "年" + month + "月" + day + "日"; // 拼接成中文日期格式字符串
    }

    

    // **8.  新增函数:  动态更新日期列表视图表格的 "Shift" 列下拉菜单选项 -  函数定义**
    function updateShiftOptionsInTableView() {
        console.log("updateShiftOptionsInTableView() 函数被调用"); //  调试信息

        const shiftSelectors = scheduleWeekView.querySelectorAll('tbody tr td select.shift-selector'); // 获取表格中 "Shift" 列的所有 <select> 元素
        const weekdayHolidaySwitches = scheduleWeekView.querySelectorAll('.weekday-holiday-switch input[type="checkbox"]'); // **新增: 获取所有工作日 (周一-周五) 的公共假日开关 (如果添加了 weekday-holiday-switch 类名)**
// **10.  新增: 为每个工作日公共假日开关添加事件监听器 (立即更新表格备选项)**
weekdayHolidaySwitches.forEach(holidaySwitch => { // 循环遍历每个工作日公共假日开关
    holidaySwitch.addEventListener('change', function() { // 为每个开关添加 'change' 事件监听器
        console.log("工作日公共假日开关状态改变， 立即更新表格备选项"); // 调试信息
        updateShiftOptionsInTableView(); // 立即调用函数更新表格备选项
    });
});
        console.log("weekdayHolidaySwitches NodeList:", weekdayHolidaySwitches); // **调试信息： 输出 weekdayHolidaySwitches NodeList**

        shiftSelectors.forEach((selectElement, index) => { // 循环遍历每个 <select> 元素及其索引 (index)
            //  index 0-6 分别对应 表格中的 周日-周六 行

            const dayIndex = index; //  index 0-6  对应周日-周六
            let dayOfWeek = (dayIndex === 0 || dayIndex === 6) ? "weekend" : "weekday"; // 判断是周末还是工作日 (周日 0, 周六 6)

            console.log(`---  处理星期${["日", "一", "二", "三", "四", "五", "六"][dayIndex]} (dayIndex: ${dayIndex}, dayOfWeek: ${dayOfWeek}) ---`); // **调试信息： 输出当前处理的星期几**

            // **新增:  检查工作日 (周一-周五) 的公共假日开关状态，  如果开启，  则  强制将 dayOfWeek 设置为 "weekend"，  使用周末备选项**
            if (dayOfWeek === "weekday" && dayIndex >= 1 && dayIndex <= 5) { //  只对工作日 (周一到周五) 进行判断
                const currentWeekdayHolidaySwitch = weekdayHolidaySwitches[dayIndex - 1]; //  获取当前工作日对应的公共假日开关 (weekdayHolidaySwitches 索引 0-4 对应 周一-周五)
                
                console.log("  工作日 (周一到周五), 尝试获取 weekdayHolidaySwitch:", currentWeekdayHolidaySwitch); // **调试信息： 输出 currentWeekdayHolidaySwitch 元素**

                
                if (currentWeekdayHolidaySwitch && currentWeekdayHolidaySwitch.checked) { //  如果开关存在 且  被选中 (checked)
                    console.log("  星期", ["日", "一", "二", "三", "四", "五", "六"][dayIndex] ,"的 公共假日开关  被选中 (checked: true)"); // **调试信息： 输出开关选中状态**
                    dayOfWeek = "weekend"; //  强制将 dayOfWeek 设置为 "weekend"， 使用周末备选项
                    console.log("  强制将 dayOfWeek 修改为: weekend"); // **调试信息： 输出 dayOfWeek 修改后的值**
                } else {
                    console.log("  星期", ["日", "一", "二", "三", "四", "五", "六"][dayIndex] ,"的 公共假日开关  未选中 或 不存在 (checked:", currentWeekdayHolidaySwitch ? currentWeekdayHolidaySwitch.checked : '开关不存在', ")"); // **调试信息： 输出开关未选中或不存在状态**
                }
            }  else {
                console.log("  周末 (周六或周日)，  跳过 工作日公共假日开关 检查"); // **调试信息：  周末跳过检查**
            
                    console.log(`星期${["日", "一", "二", "三", "四", "五", "六"][dayIndex]} 的公共假日开关已开启， 备选项切换为周末组`); //  调试信息
                }
            

            let currentOptionsGroupKey = currentDepot; //  默认为当前 DEPOT 的正常备选项组 (例如 "depot1", "depot2", "depot3")
            if (isSchoolHolidayEnabled) {
                currentOptionsGroupKey += "-schoolHoliday"; //  如果 School Holiday 开关开启，则使用 School Holiday 备选项组 (例如 "depot1-schoolHoliday")
            }

            const optionsGroup = shiftOptionsGroups[currentOptionsGroupKey][dayOfWeek]; //  根据条件，获取对应的备选项组 (例如 shiftOptionsGroups["depot1"]["weekend"]  或者  shiftOptionsGroups["depot1-schoolHoliday"]["weekday"])


            //  清空下拉菜单  之前已有的选项 (除了 "请选择班次" 默认选项)
            while (selectElement.options.length > 1) { //  保留第一个 option (index 0) 作为 "请选择班次" 提示
                selectElement.remove(1); //  从索引 1 开始移除选项 (索引 0 是 "请选择班次")
            }


            //  将新的备选项组  添加到下拉菜单
            optionsGroup.forEach(optionText => { // 循环遍历备选项组中的每个选项文本
                const optionElement = document.createElement('option'); //  动态创建 <option> 元素
                optionElement.value = optionText; //  设置 <option> 的 value 属性 (例如 "早班", "午班"...) -  **注意:  这里 value 和 textContent 设置为相同的 选项文本**
                optionElement.textContent = optionText; //  设置 <option> 的文本内容 (用户看到的选项文字， 例如 "早班", "午班"...)
                selectElement.appendChild(optionElement); //  将新创建的 <option> 元素  添加到 <select> 下拉菜单中
            });


        }); //  shiftSelectors.forEach() 循环 结束

    } //  updateShiftOptionsInTableView() 函数定义 结束


}); //  DOMContentLoaded 事件监听器 结束


const shiftDetailsDictionary = {
"T28301T": {"timeRanges": ["05:41-14:57"],"mealLocation": "TAURANGA CBD","mealTime": "56 minutes"},
"T28301T": {"timeRanges": ["05:41-14:57"],"mealLocation": "TAURANGA CBD","mealTime": "56 minutes"},
"T28302T": {"timeRanges": ["11:29-21:27"],"mealLocation": "TAURANGA CBD","mealTime": "41 minutes"},
"T28303T": {"timeRanges": ["06:11-15:53"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
"T28304T": {"timeRanges": ["11:45-21:10"],"mealLocation": "TAURANGA CBD","mealTime": "45 minutes"},
"T28305T": {"timeRanges": ["06:14-16:13"],"mealLocation": "TAURANGA CBD","mealTime": "31 minutes"},
"T28307T": {"timeRanges": ["06:29-16:27"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
"T28309T": {"timeRanges": ["06:39-16:16"],"mealLocation": "TAURANGA CBD","mealTime": "58 minutes"},
"T28311T": {"timeRanges": ["06:41-16:36"],"mealLocation": "TAURANGA CBD","mealTime": "50 minutes"},
"T28313T": {"timeRanges": ["07:04-16:26"],"mealLocation": "TAURANGA CBD","mealTime": "46 minutes"},
"T28315T": {"timeRanges": ["07:16-16:57"],"mealLocation": "TAURANGA CBD","mealTime": "54 minutes"},
"T28317T": {"timeRanges": ["07:20-17:02"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
"T28701": {"timeRanges": ["05:44-16:16"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
"T28702": {"timeRanges": ["10:01-20:56"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
"T28703": {"timeRanges": ["06:11-17:56"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T28704": {"timeRanges": ["11:46-21:52"],"mealLocation": "TAURANGA CBD","mealTime": "34 minutes"},
"T28705": {"timeRanges": ["06:44-18:39"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T28707": {"timeRanges": ["07:11-18:56"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T28709": {"timeRanges": ["07:22-19:21"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T28711": {"timeRanges": ["08:22-19:56"],"mealLocation": "TAURANGA CBD","mealTime": "49 minutes"},
"T28713": {"timeRanges": ["08:45-20:13"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T28802": {"timeRanges": ["11:44-20:35"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T28804": {"timeRanges": ["11:49-20:25"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T28806": {"timeRanges": ["12:22-20:36"],"mealLocation": "TAURANGA CBD","mealTime": "49 minutes"},
"T28808": {"timeRanges": ["12:46-21:04"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
"T26301T": {"timeRanges": ["05:34-14:10"],"mealLocation": "TAURANGA CBD","mealTime": "32 minutes"},
"T26302T": {"timeRanges": ["10:34-19:52"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
"T26303T": {"timeRanges": ["05:40-15:06"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T26304T": {"timeRanges": ["10:38-20:35"],"mealLocation": "TAURANGA CBD","mealTime": "48 minutes"},
"T26305T": {"timeRanges": ["05:34-14:24"],"mealLocation": "GREERTON DEPOT","mealTime": "43 minutes"},
"T26306T": {"timeRanges": ["10:39-19:44"],"mealLocation": "TAURANGA CBD","mealTime": "40 minutes"},
"T26307T": {"timeRanges": ["05:42-15:14"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
"T26308T": {"timeRanges": ["10:44-20:40"],"mealLocation": "TAURANGA CBD","mealTime": "46 minutes"},
"T26309T": {"timeRanges": ["05:45-14:44"],"mealLocation": "TAURANGA CBD","mealTime": "57 minutes"},
"T26310T": {"timeRanges": ["10:51-20:44"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
"T26311T": {"timeRanges": ["05:53-14:56"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
"T26312T": {"timeRanges": ["10:59-20:48"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
"T26313T": {"timeRanges": ["05:58-15:43"],"mealLocation": "TAURANGA CBD","mealTime": "32 minutes"},
"T26314T": {"timeRanges": ["11:05-20:54"],"mealLocation": "TAURANGA CBD","mealTime": "44 minutes"},
"T26315T": {"timeRanges": ["06:00-15:56"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
"T26316T": {"timeRanges": ["11:08-21:08"],"mealLocation": "TAURANGA CBD","mealTime": "43 minutes"},
"T26317T": {"timeRanges": ["06:02-15:57"],"mealLocation": "TAURANGA CBD","mealTime": "51 minutes"},
"T26318T": {"timeRanges": ["11:09-21:02"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
"T26319T": {"timeRanges": ["06:14-15:11"],"mealLocation": "TAURANGA CBD","mealTime": "40 minutes"},
"T26320T": {"timeRanges": ["11:09-21:09"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
"T26321T": {"timeRanges": ["06:19-16:14"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
"T26322T": {"timeRanges": ["11:19-21:14"],"mealLocation": "TAURANGA CBD","mealTime": "37 minutes"},
"T26323T": {"timeRanges": ["06:39-16:23"],"mealLocation": "TAURANGA CBD","mealTime": "47 minutes"},
"T26324T": {"timeRanges": ["11:19-21:18"],"mealLocation": "TAURANGA CBD","mealTime": "45 minutes"},
"T26325T": {"timeRanges": ["06:45-16:33"],"mealLocation": "TAURANGA CBD","mealTime": "44 minutes"},
"T26326T": {"timeRanges": ["11:34-21:25"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
"T26327T": {"timeRanges": ["06:55-16:49"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
"T26328T": {"timeRanges": ["11:38-21:30"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
"T26329T": {"timeRanges": ["06:56-16:46"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
"T26330T": {"timeRanges": ["11:39-21:29"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
"T26331T": {"timeRanges": ["06:59-16:44"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
"T26332T": {"timeRanges": ["11:51-21:35"],"mealLocation": "TAURANGA CBD","mealTime": "31 minutes"},
"T26333T": {"timeRanges": ["06:59-16:59"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
"T26334T": {"timeRanges": ["11:59-21:55"],"mealLocation": "TAURANGA CBD","mealTime": "46 minutes"},
"T26335T": {"timeRanges": ["07:09-16:56"],"mealLocation": "TAURANGA CBD","mealTime": "48 minutes"},
"T26336T": {"timeRanges": ["12:19-21:44"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
"T26338T": {"timeRanges": ["13:10-21:48"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
"T26340T": {"timeRanges": ["13:34-22:25"],"mealLocation": "TAURANGA CBD","mealTime": "45 minutes"},
"T26701": {"timeRanges": ["05:37-15:37"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
"T26702": {"timeRanges": ["09:10-20:25"],"mealLocation": "TAURANGA CBD","mealTime": "50 minutes"},
"T26703": {"timeRanges": ["05:47-15:51"],"mealLocation": "GREERTON DEPOT","mealTime": "41 minutes"},
"T26704": {"timeRanges": ["09:34-20:35"],"mealLocation": "GREERTON DEPOT","mealTime": "31 minutes"},
"T26705": {"timeRanges": ["05:53-16:25"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
"T26706": {"timeRanges": ["09:53-20:55"],"mealLocation": "GREERTON DEPOT","mealTime": "41 minutes"},
"T26707": {"timeRanges": ["05:53-16:34"],"mealLocation": "TAURANGA CBD","mealTime": "55 minutes"},
"T26709": {"timeRanges": ["05:54-16:41"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
"T26711": {"timeRanges": ["06:01-17:20"],"mealLocation": "GREERTON DEPOT","mealTime": "46 minutes"},
"T26713": {"timeRanges": ["06:02-17:10"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26715": {"timeRanges": ["06:08-17:45"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26717": {"timeRanges": ["06:14-17:48"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26719": {"timeRanges": ["06:19-17:59"],"mealLocation": "GREERTON DEPOT","mealTime": "45 minutes"},
"T26721": {"timeRanges": ["06:35-18:18"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26723": {"timeRanges": ["06:46-18:25"],"mealLocation": "PAPAMOA DEPOT","mealTime": "53 minutes"},
"T26725": {"timeRanges": ["06:52-18:50"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T26727": {"timeRanges": ["07:23-18:45"],"mealLocation": "TAURANGA CBD","mealTime": "56 minutes"},
"T26729": {"timeRanges": ["07:25-19:24"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26731": {"timeRanges": ["07:52-19:36"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T26733": {"timeRanges": ["08:05-19:27"],"mealLocation": "TAURANGA CBD","mealTime": "34 minutes"},
"T26735": {"timeRanges": ["08:10-19:38"],"mealLocation": "TAURANGA CBD","mealTime": "59 minutes"},
"T26737": {"timeRanges": ["08:11-19:48"],"mealLocation": "TAURANGA CBD","mealTime": "40 minutes"},
"T26739": {"timeRanges": ["08:15-20:10"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T26741": {"timeRanges": ["08:22-20:01"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T26743": {"timeRanges": ["08:41-19:55"],"mealLocation": "TAURANGA CBD","mealTime": "54 minutes"},
"T26745": {"timeRanges": ["08:46-20:18"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26747": {"timeRanges": ["09:00-20:57"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26801": {"timeRanges": ["05:42-14:21"],"mealLocation": "TAURANGA CBD","mealTime": "42 minutes"},
"T26802": {"timeRanges": ["11:22-20:20"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
"T26803": {"timeRanges": ["05:45-13:49"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
"T26804": {"timeRanges": ["12:00-20:54"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26805": {"timeRanges": ["06:24-14:54"],"mealLocation": "TAURANGA CBD","mealTime": "36 minutes"},
"T26806": {"timeRanges": ["12:23-20:48"],"mealLocation": "TAURANGA CBD","mealTime": "59 minutes"},
"T26807": {"timeRanges": ["06:27-15:21"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
"T26808": {"timeRanges": ["12:53-21:16"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
"T26810": {"timeRanges": ["13:22-21:02"],"mealLocation": "TAURANGA CBD","mealTime": "34 minutes"},
"T26501T": {"timeRanges": ["06:01-10:39", "14:34-18:28"],"mealLocation": "无","mealTime": "无"}, 
"T26502T": {"timeRanges": ["05:46-10:38", "13:38-18:41"],"mealLocation": "无","mealTime": "无"}, 
"T26503T": {"timeRanges": ["06:16-09:26", "13:24-18:18"],"mealLocation": "无","mealTime": "无"}, 
"T26504T": {"timeRanges": ["05:52-10:05", "13:35-18:41"],"mealLocation": "无","mealTime": "无"}, 
"T26505T": {"timeRanges": ["06:00-11:09", "14:09-18:49"],"mealLocation": "无","mealTime": "无"}, 
"T26506T": {"timeRanges": ["06:10-10:33", "14:24-19:06"],"mealLocation": "无","mealTime": "无"}, 
"T26507T": {"timeRanges": ["06:16-11:36", "14:44-19:08"],"mealLocation": "无","mealTime": "无"}, 
"T26508T": {"timeRanges": ["06:27-11:21", "14:44-18:57"],"mealLocation": "无","mealTime": "无"}, 
"T26509T": {"timeRanges": ["06:27-10:07", "14:04-19:20"],"mealLocation": "无","mealTime": "无"}, 
"T26510T": {"timeRanges": ["06:32-11:37", "14:38-19:31"],"mealLocation": "无","mealTime": "无"}, 
"T26511T": {"timeRanges": ["06:35-11:25", "13:59-18:38"],"mealLocation": "无","mealTime": "无"}, 
"T26512T": {"timeRanges": ["06:38-11:39", "14:40-19:36"],"mealLocation": "无","mealTime": "无"}, 
"T26513T": {"timeRanges": ["06:38-11:05", "15:05-19:38"],"mealLocation": "无","mealTime": "无"}, 
"T26514T": {"timeRanges": ["06:42-11:56", "14:59-19:37"],"mealLocation": "无","mealTime": "无"}, 
"T26515T": {"timeRanges": ["06:44-11:53", "14:38-19:27"],"mealLocation": "无","mealTime": "无"}, 
"T26516T": {"timeRanges": ["06:51-11:55", "14:38-19:51"],"mealLocation": "无","mealTime": "无"}, 
"T26517T": {"timeRanges": ["06:57-11:24", "15:04-19:57"],"mealLocation": "无","mealTime": "无"}, 
"T26518T": {"timeRanges": ["07:01-12:09", "15:09-20:01"],"mealLocation": "无","mealTime": "无"}, 
"T26519T": {"timeRanges": ["07:07-11:49", "14:44-19:58"],"mealLocation": "无","mealTime": "无"}, 
"T26520T": {"timeRanges": ["07:08-12:03", "15:04-20:08"],"mealLocation": "无","mealTime": "无"}, 
"T26521T": {"timeRanges": ["07:11-12:24", "15:44-20:10"],"mealLocation": "无","mealTime": "无"}, 
"T26522T": {"timeRanges": ["07:17-12:13", "15:06-20:07"],"mealLocation": "无","mealTime": "无"}, 
"T26523T": {"timeRanges": ["07:20-12:33", "16:08-20:18"],"mealLocation": "无","mealTime": "无"}, 
"T26524T": {"timeRanges": ["07:33-12:51", "16:09-20:24"],"mealLocation": "无","mealTime": "无"}, 
"T26525T": {"timeRanges": ["09:09-13:53", "16:21-20:55"],"mealLocation": "无","mealTime": "无"},
"T28501T": {"timeRanges": ["05:29-10:01", "13:41-18:02"],"mealLocation": "无","mealTime": "无"},
"T28502T": {"timeRanges": ["05:59-10:39", "13:59-18:42"],"mealLocation": "无","mealTime": "无"},
"T28503T": {"timeRanges": ["06:44-11:41", "14:50-19:40"],"mealLocation": "无","mealTime": "无"},
"T28504T": {"timeRanges": ["06:59-12:01", "14:56-19:45"],"mealLocation": "无","mealTime": "无"},
"T28505T": {"timeRanges": ["07:27-12:41", "16:07-20:27"],"mealLocation": "无","mealTime": "无"},
"T28506T": {"timeRanges": ["07:28-12:11", "14:52-19:57"],"mealLocation": "无","mealTime": "无"},
"T28507T": {"timeRanges": ["07:29-12:09", "14:51-20:10"],"mealLocation": "无","mealTime": "无"},
"T28400T": {"timeRanges": ["07:25-08:53", "14:05-15:59"],"mealLocation": "无","mealTime": "无"},
"T28401T": {"timeRanges": ["07:29-08:53", "14:05-15:53"],"mealLocation": "无","mealTime": "无"},
"T28402T": {"timeRanges": ["07:32-08:43", "14:20-16:08"],"mealLocation": "无","mealTime": "无"},
"T28403T": {"timeRanges": ["07:32-08:43", "14:20-16:08"],"mealLocation": "无","mealTime": "无"},
"T28404T": {"timeRanges": ["07:32-08:43", "14:20-16:08"],"mealLocation": "无","mealTime": "无"},
"T28405T": {"timeRanges": ["07:37-08:48", "14:05-15:53"],"mealLocation": "无","mealTime": "无"},
"T27301T": {"timeRanges": ["06:24-08:47", "14:28-16:56"],"mealLocation": "无","mealTime": "无"},
"T27303T": {"timeRanges": ["06:55-08:37", "14:28-16:45"],"mealLocation": "无","mealTime": "无"},
"T27305T": {"timeRanges": ["06:59-08:46", "14:23-16:11"],"mealLocation": "无","mealTime": "无"},
"T27307T": {"timeRanges": ["07:04-08:37", "14:28-16:51"],"mealLocation": "无","mealTime": "无"},
"T27309T": {"timeRanges": ["07:04-08:37", "14:28-16:51"],"mealLocation": "无","mealTime": "无"},
"T27311T": {"timeRanges": ["07:09-08:40", "14:29-16:26"],"mealLocation": "无","mealTime": "无"},
"T27313T": {"timeRanges": ["07:10-08:37", "14:28-16:25"],"mealLocation": "无","mealTime": "无"},
"T27315T": {"timeRanges": ["07:11-08:40", "14:29-16:19"],"mealLocation": "无","mealTime": "无"},
"T27317T": {"timeRanges": ["07:11-08:40", "14:29-16:19"],"mealLocation": "无","mealTime": "无"},
"T27319T": {"timeRanges": ["07:11-08:53", "14:42-16:38"],"mealLocation": "无","mealTime": "无"},
"T27321T": {"timeRanges": ["07:14-08:42", "14:20-16:27"],"mealLocation": "无","mealTime": "无"},
"T27323T": {"timeRanges": ["07:15-08:36", "14:34-16:10"],"mealLocation": "无","mealTime": "无"},
"T27325T": {"timeRanges": ["07:17-09:12", "13:41-16:19"],"mealLocation": "无","mealTime": "无"},
"T27327T": {"timeRanges": ["07:18-08:40", "14:29-16:29"],"mealLocation": "无","mealTime": "无"},
"T27329T": {"timeRanges": ["07:20-08:38", "14:34-16:33"],"mealLocation": "无","mealTime": "无"},
"T27331T": {"timeRanges": ["07:20-08:38", "14:34-16:33"],"mealLocation": "无","mealTime": "无"},
"T27333T": {"timeRanges": ["07:20-08:47", "14:25-16:50"],"mealLocation": "无","mealTime": "无"},
"T27335T": {"timeRanges": ["07:22-08:37", "14:28-16:15"],"mealLocation": "无","mealTime": "无"},
"T27337T": {"timeRanges": ["07:23-09:01", "14:25-16:14"],"mealLocation": "无","mealTime": "无"},
"T27339T": {"timeRanges": ["07:24-08:36", "14:34-16:14"],"mealLocation": "无","mealTime": "无"},
"T27341T": {"timeRanges": ["07:25-08:45", "14:39-16:16"],"mealLocation": "无","mealTime": "无"},
"T27343T": {"timeRanges": ["07:25-08:36", "14:33-16:33"],"mealLocation": "无","mealTime": "无"},
"T27345T": {"timeRanges": ["07:28-08:33", "14:33-16:31"],"mealLocation": "无","mealTime": "无"},
"T27347T": {"timeRanges": ["07:29-08:35", "14:35-16:31"],"mealLocation": "无","mealTime": "无"},
"T27349T": {"timeRanges": ["07:30-08:58", "14:43-16:43"],"mealLocation": "无","mealTime": "无"},
"T27351T": {"timeRanges": ["07:34-08:40", "13:41-16:16"],"mealLocation": "无","mealTime": "无"},
"T27353T": {"timeRanges": ["07:39-08:46", "14:38-16:20"],"mealLocation": "无","mealTime": "无"},
"T27355T": {"timeRanges": [, "13:44-17:44"],"mealLocation": "无","mealTime": "无"},
"T27357T": {"timeRanges": ["07:39-08:55", "14:39-16:10"],"mealLocation": "无","mealTime": "无"},
"T27359T": {"timeRanges": ["07:25-09:08", "15:07-16:33"],"mealLocation": "无","mealTime": "无"},
"T27361T": {"timeRanges": ["07:31-09:20", "14:17-16:41"],"mealLocation": "无","mealTime": "无"},
"T27362T": {"timeRanges": ["07:07-09:52", "13:57-16:07"],"mealLocation": "无","mealTime": "无"},
"T27363T": {"timeRanges": [, "12:41-16:41"],"mealLocation": "无","mealTime": "无"},
"T27364T": {"timeRanges": [, "12:10-16:10"],"mealLocation": "无","mealTime": "无"},
"T27365T": {"timeRanges": [, "12:30-16:38"],"mealLocation": "无","mealTime": "无"},
"OFF": {"timeRanges": [],"mealLocation": "无","mealTime": "无"},
};



//  2. 定义备选项组 (Shift Options) -  根据你的需求定义六组备选项
const shiftOptionsGroups = {
    //  DEPOT 按钮 1 (例如 Greerton) -  正常情况 (School Holiday 开关 关闭)
    "depot1": {
        "weekday": ["OFF", "T26301T", "T26302T", "T26303T", "T26304T", "T26305T", "T26306T", "T26307T", "T26308T", "T26309T", "T26310T", "T26311T", "T26312T", "T26313T", "T26314T", "T26315T", "T26316T", "T26317T", "T26318T", "T26319T", "T26320T", "T26321T", "T26322T", "T26323T", "T26324T", "T26325T", "T26326T", "T26327T", "T26328T", "T26329T", "T26330T", "T26331T", "T26332T", "T26333T", "T26334T", "T26335T", "T26336T", "T26338T", "T26340T", "T26501T", "T26502T", "T26503T", "T26504T", "T26505T", "T26506T", "T26507T", "T26508T", "T26509T", "T26510T", "T26511T", "T26512T", "T26513T", "T26514T", "T26515T", "T26516T", "T26517T", "T26518T", "T26519T", "T26520T", "T26521T", "T26522T", "T26523T", "T26524T", "T26525T"], // B1 组备选项 (周一到周五)
        "weekend": ["OFF", "T26701", "T26702", "T26703", "T26704", "T26705", "T26706", "T26707", "T26709", "T26711", "T26713", "T26715", "T26717", "T26719", "T26721", "T26723", "T26725", "T26727", "T26729", "T26731", "T26733", "T26735", "T26737", "T26739", "T26741", "T26743", "T26745", "T26747", "T26801", "T26802", "T26803", "T26804", "T26805", "T26806", "T26807", "T26808", "T26810"]      // A1 组备选项 (周六和周日)
    },
    //  DEPOT 按钮 1 (例如 Greerton) -  School Holiday 开启情况
    "depot1-schoolHoliday": {
        "weekday": ["SHB1-选项1", "SHB1-选项2", "SHB1-选项3", "SHB1-选项4", "SHB1-选项5"], // SHB1 组备选项 (周一到周五)
        "weekend": ["SHA1-选项1", "SHA1-选项2", "SHA1-选项3", "SHA1-选项4"]        // SHA1 组备选项 (周六和周日)
    },

    //  DEPOT 按钮 2 (例如 Papamoa) -  正常情况 (School Holiday 开关 关闭)
    "depot2": {
        "weekday": ["OFF", "T28301T", "T28302T", "T28303T", "T28304T", "T28305T", "T28307T", "T28309T", "T28311T", "T28313T", "T28315T", "T28317T", "T28501T", "T28502T", "T28503T", "T28504T", "T28505T", "T28506T", "T28507T", "T28400T", "T28401T", "T28402T", "T28403T", "T28404T", "T28405T"], // B2 组备选项 (周一到周五)
        "weekend": ["OFF", "T28701", "T28702", "T28703", "T28704", "T28705", "T28707", "T28709", "T28711", "T28713", "T28802", "T28804", "T28806", "T28808"]      // A2 组备选项 (周六和周日)
    },
    //  DEPOT 按钮 2 (例如 Papamoa) -  School Holiday 开启情况
    "depot2-schoolHoliday": {
        "weekday": ["SHB2-选项1", "SHB2-选项2", "SHB2-选项3", "SHB2-选项4", "SHB2-选项5"], // SHB2 组备选项 (周一到周五)
        "weekend": ["SHA2-选项1", "SHA2-选项2", "SHA2-选项3", "SHA2-选项4"]        // SHA2 组备选项 (周六和周日)
    },

    //  DEPOT 按钮 3 (例如 Maleme) -  正常情况 (School Holiday 开关 关闭)
    "depot3": {
        "weekday": ["OFF", "T27301T", "T27303T", "T27305T", "T27307T", "T27309T", "T27311T", "T27313T", "T27315T", "T27317T", "T27319T", "T27321T", "T27323T", "T27325T", "T27327T", "T27329T", "T27331T", "T27333T", "T27335T", "T27337T", "T27339T", "T27341T", "T27343T", "T27345T", "T27347T", "T27349T", "T27351T", "T27353T", "T27355T", "T27357T", "T27359T", "T27361T", "T27362T", "T27363T", "T27364T", "T27365T"], // B3 组备选项 (周一到周五)
        "weekend": ["OFF"]      // A3 组备选项 (周六和周日)
    },
    //  DEPOT 按钮 3 (例如 Maleme) -  School Holiday 开启情况
    "depot3-schoolHoliday": {
        "weekday": ["OFF"], // SHB3 组备选项 (周一到周五)
        "weekend": ["OFF"]        // SHA3 组备选项 (周六和周日)
    }
};

 //  3.  存储当前 DEPOT 选择 和 School Holiday 开关状态
 let currentDepot = null;           //  存储当前选择的 DEPOT (例如 "depot1", "depot2", "depot3"， 默认为 null)
 let isSchoolHolidayEnabled = false; //  存储 School Holiday 开关状态 (true=开启, false=关闭， 默认为 false)


 if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }