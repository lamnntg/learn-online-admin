const handlePathName = (pathName) => {
	var listPath = {
		pathName: '',
		subPathName: '',
		url: '#',
	};

	if (pathName.indexOf('classroom/') !== -1 && pathName.indexOf('/exam') !== -1) {
		return {
			...listPath,
			pathName: 'Chi tiết lớp học',
			subPathName: 'Bài Kiểm tra',
			url: `/classroom/${pathName.split('/')[1]}`,
		};
	}

	if (pathName.indexOf('classroom/') !== -1 && pathName.indexOf('/homework') !== -1) {
		return {
			...listPath,
			pathName: 'Chi tiết lớp học',
			subPathName: 'Bài tập',
		};
	}
	if (pathName.indexOf('classroom/') !== -1 && pathName.indexOf('/people') !== -1) {
		return {
			...listPath,
			pathName: 'Chi tiết lớp học',
			subPathName: 'Thành viên',
		};
	}

	if (pathName.indexOf('classroom/') !== -1) {
		return {
			...listPath,
			pathName: 'Chi tiết lớp học',
			subPathName: 'Chi tiết lớp học',
		};
	}

	const fullPathName = pathName.split('/');
	pathName = fullPathName[0];

	switch (pathName) {
		case 'classroom':
			listPath.pathName = 'Lớp học';
			listPath.subPathName = 'Quản lý lớp học';
			break;
		case 'dashboard':
			listPath.pathName = 'Home';
			listPath.subPathName = 'Home';
			break;
		case 'courses':
			listPath.pathName = 'Khóa học';
			if (fullPathName[1] === 'create') listPath.subPathName = 'Tạo câu hỏi';
			else {
				listPath.subPathName = 'Quản lý khóa học';
			}
			listPath.url = '/courses';
			break;
		case 'users':
			listPath.pathName = 'Nguời dùng';
			listPath.subPathName = 'Quản lý người dùng';
			listPath.url = '/users';
			break;
		default:
			break;
	}

	return listPath;
};

export const handle = { handlePathName };
