const fs = require('fs');
const prompt = require('prompt-sync')();

// Đường dẫn tới file JSON lưu trữ dữ liệu bài viết
const filePath = './posts.json';

// Hàm đọc dữ liệu từ file
function readData() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Hàm ghi dữ liệu vào file
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Hiển thị danh sách bài viết
function displayPosts() {
    const posts = readData();
    if (posts.length === 0) {
        console.log('Không có bài viết nào.');
    } else {
        console.table(posts);
    }
}

// Thêm một bài viết mới
function addPost() {
    const posts = readData();
    const id = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const title = prompt('Nhập tiêu đề: ');
    const content = prompt('Nhập nội dung: ');

    const newPost = { id, title, content };
    posts.push(newPost);
    writeData(posts);
    console.log('Bài viết đã được thêm thành công.');
}

// Sửa một bài viết
function editPost() {
    const posts = readData();
    const id = parseInt(prompt('Nhập ID bài viết cần sửa: '), 10);
    const post = posts.find(p => p.id === id);

    if (post) {
        post.title = prompt(`Nhập tiêu đề mới (hiện tại: ${post.title}): `) || post.title;
        post.content = prompt(`Nhập nội dung mới (hiện tại: ${post.content}): `) || post.content;
        writeData(posts);
        console.log('Bài viết đã được cập nhật.');
    } else {
        console.log('Không tìm thấy bài viết với ID đó.');
    }
}

// Xóa một bài viết
function deletePost() {
    const posts = readData();
    const id = parseInt(prompt('Nhập ID bài viết cần xóa: '), 10);
    const updatedPosts = posts.filter(p => p.id !== id);

    if (posts.length !== updatedPosts.length) {
        writeData(updatedPosts);
        console.log('Bài viết đã được xóa.');
    } else {
        console.log('Không tìm thấy bài viết với ID đó.');
    }
}

// Menu điều khiển
function mainMenu() {
    let exit = false;
    while (!exit) {
        console.log('\n--- QUẢN LÝ BÀI VIẾT ---');
        console.log('1. Hiển thị danh sách bài viết');
        console.log('2. Thêm một bài viết mới');
        console.log('3. Sửa bài viết');
        console.log('4. Xóa bài viết');
        console.log('5. Thoát');
        const choice = prompt('Chọn chức năng (1-5): ');

        switch (choice) {
            case '1':
                displayPosts();
                break;
            case '2':
                addPost();
                break;
            case '3':
                editPost();
                break;
            case '4':
                deletePost();
                break;
            case '5':
                exit = true;
                console.log('Đang thoát chương trình...');
                break;
            default:
                console.log('Lựa chọn không hợp lệ. Vui lòng thử lại.');
        }
    }
}

// Chạy chương trình
mainMenu();
