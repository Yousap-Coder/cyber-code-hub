// وظيفة التبديل بين التبويبات
function openTab(tabId) {
    // إخفاء كل المحتويات
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // إزالة الحالة النشطة من الأزرار
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // إظهار التبويب المختار
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// وظيفة تنزيل الكود كملف
function downloadCode(content, filename) {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
