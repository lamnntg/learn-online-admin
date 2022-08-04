import {
  Card,
  Table,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Modal,
  Form,
  Input,
  Space,
  TimePicker,
  Tooltip
} from "antd";
import React, { useState, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { courseService } from "../../services/course.service";
import { Link } from "react-router-dom";
import moment from "moment";
import { authService } from "../../services/auth.service";
import pencil from "../../assets/images/pencil.svg";

const { Title } = Typography;

// project table start
const titleTable = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
    width: "25%",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    width: "20%",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Người tạo",
    dataIndex: "owner",
  },
  {
    title: "Số lượng bài học",
    dataIndex: "count_lesson",
  },
  {
    title: "Hành động",
    dataIndex: "actions",
  },
];

const dataproject = [
  {
    key: "1",

    name: (
      <>
        <Avatar.Group>
          <div className="avatar-info">
            <Title level={5}>Spotify Version</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$14,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={30} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <div className="avatar-info">
            <Title level={5}>Progress Track</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$3,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={10} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <div className="avatar-info">
            <Title level={5}> Jira Platform Errors</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">Not Set</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">done</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" format={() => "done"} />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <div className="avatar-info">
            <Title level={5}> Launch new Mobile App</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$20,600</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress
            percent={50}
            size="small"
            status="exception"
            format={() => "50%"}
          />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <div className="avatar-info">
            <Title level={5}>Web Dev</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$4,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={80} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <div className="avatar-info">
            <Title level={5}>Redesign Online Store</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$2,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={0} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
];

function Course() {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const renderCourses = () => {
    let arrCourseUI = [];
    courses.forEach((course) => arrCourseUI.push(({
      key: course._id,
      title: (
        <>
          <Avatar.Group>
            <div className="avatar-info">
              <Title level={5}>{course.title}</Title>
              <div className="semibold">{course.sub_title}</div>
            </div>
          </Avatar.Group>
        </>
      ),
      description: (
        <>
          <Tooltip placement="topLeft" title={course.description}>
            {course.description}
          </Tooltip>
        </>
      ),
      owner: (
        <>
          <div className="text-sm">{(course.owner !== null ? course.owner.name : "")}</div>
        </>
      ),
      count_lesson: (
        <>
          <div className="ant-progress-project">
            <div className="text-sm">{course.lessions.length}</div>
          </div>
        </>
      ),
      actions: (
        <span>
          <Link to="/">
            <img src={pencil} alt="" />
          </Link>
        </span>
      ),
    })));
    return arrCourseUI;
  };
  const currentUser = authService.getCurrentUser();
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
  };


  useEffect(() => {
    courseService.getAll().then((res) => {
      setCourses(res.data.data);
      // let courseUI = renderCourses();
    });
  }, []);

  const onFinish = (values) => {
    const newLessions = values.lessions.map((lession) => {
      return {
        title: lession.title,
        url: lession.url,
        time: lession.time.format("HH:mm"),
      };
    });

    const newCourse = {
      title: values.title,
      description: values.description,
      sub_title: values.sub_title,
      lessions: newLessions,
      owner: currentUser.id,
    };

    courseService
      .create(newCourse)
      .then((res) => {
        // setCourses([...courses, res.data]);
        setIsModalVisible(false);
        form.resetFields();
        message.success("Tạo khóa học thành công");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (time, timeString) => {};

  return (
    <div>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Danh sách khóa học"
        extra={
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Tạo khóa học
            </Button>
          </>
        }
      >
        <div className="table-responsive">
          <Table
            columns={titleTable}
            dataSource={[...renderCourses()]}
            pagination={false}
            className="ant-border-space"
          />
        </div>
      </Card>
      <Modal
        title={`Tạo khóa học`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={[]}
      >
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Tên khóa học"
            rules={[
              {
                required: true,
                message: "Tên khóa học không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sub_title"
            label="Tiêu đề phụ"
            rules={[
              {
                required: true,
                message: "Tiêu đề phụ không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.List name="lessions">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.url !== curValues.url ||
                        prevValues.title !== curValues.title ||
                        prevValues.time !== curValues.time
                      }
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          label="Tên bài học"
                          name={[field.name, "title"]}
                          rules={[
                            {
                              required: true,
                              message: "Tên bài học không được bỏ trống",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="url"
                      name={[field.name, "url"]}
                      rules={[
                        {
                          required: true,
                          message: "Link không được bỏ trống",
                        },
                        {
                          type: "url",
                          message: "Link phải là một Url.",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Thời lượng"
                      name={[field.name, "time"]}
                      rules={[
                        {
                          required: true,
                          message: "Thời lượng không được bỏ trống.",
                        },
                      ]}
                    >
                      <TimePicker
                        onChange={onChange}
                        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                      />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm bài học
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo khóa học
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Course;
