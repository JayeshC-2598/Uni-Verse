import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";
import {
    Person,
    Dashboard,
    Ballot,
    VpnKey,
    Group,
    Chat,
    Search,
} from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import { useSpring, animated, config } from "react-spring";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100vw;
    max-width: 100%;
    background-color: white;
`;

const MenuItem = styled.div`
    padding: 0.4rem;
    width: 18rem;
    margin-bottom: 0.4rem;
    border-radius: 10px;
    display: flex;
    // display: inline-block;
    flex-direction: row;
    justify-content: space-betweeen;
    gap: 1rem;
    align-items: center;
    > h1 {
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
    }

    &:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }
`;

const Item = styled.div``;

const SubContainer = styled(animated.div)`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-inline: 1rem;
`;

const Header = styled.div`
    display: flex;
    width: 18vw;
    max-width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 20px 5px #888888;
    border-radius: 40px;
    padding-top: 1.7rem;
    padding-bottom: 1.7rem;
    > h1 {
        // font:500 2.2vmax;
        font-size: 1.5rem;
        color: #0077b6;
        // transform:translateX(-10vmax) translateY(-2vmax)
    }
    > img {
        width: 5vmax;
        height: 5vmax;
        object-fit: contain;
        border-radius: 100%;
        transition: all 0.5s;
    }
    > a {
        border-radius: 10px;
        background-color: #0077b6;
        font: 400 1vmax;
        color: white;
        text-decoration: none;
        padding: 0.5vmax;
        width: 30%;
        // margin: 4vmax;
        margin-top: 0.5rem;
        text-align: center;
        transition: all 0.5s;
    }

    a:hover {
        background-color: #c0dbeb;
        color: #101010;
        cursor: pointer;
    }
`;

const HeaderOne = styled.div`
    display: flex;
    width: 18vw;
    max-width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    box-shadow: -5px -5px 30px -5px inset #888888;
    padding-top: 1rem;
    padding-bottom: 1rem;
    > h1 {
        // font:500 2.2vmax;
        font-size: 1.5rem;
        color: #0077b6;
        // transform:translateX(-10vmax) translateY(-2vmax)
    }
    > img {
        width: 5vmax;
        height: 5vmax;
        object-fit: contain;
        border-radius: 100%;
        transition: all 0.5s;
    }
    > a {
        border-radius: 10px;
        background-color: #0077b6;
        font: 400 1vmax;
        color: white;
        text-decoration: none;
        padding: 0.5vmax;
        width: 30%;
        // margin: 4vmax;
        margin-top: 0.5rem;
        text-align: center;
        transition: all 0.5s;
    }
`;

const ProfileContainer = styled(animated.div)`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    width: 80vw;
    max-width: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-inline: 1rem;
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 5px;
    border-radius: 20px;
    box-shadow: 5px 5px 20px 5px #888888;
`;

const SectionItem = styled.div`
    width: 12rem;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 1rem;
    border: 1px solid #87ceeb;
    border-radius: 20px;
    > h4 {
        background-color: #9bedff;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-inline: 1.3rem;
        color: #0077b6;
        font-size: 1.3rem;
        text-align: center;
    }
    > p {
        font-size: 1.1rem;
        font-weight: 500;
        text-align: center;
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    border-radius: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 5px 5px 20px 5px #888888;
`;

const ProfileInfoItem = styled.div`
    justify-content: space-evenly;
    align-items: center;
    padding: 1.3vmax;
    box-sizing: border-box;
    // border-bottom: 0.5px solid #0077b6;
    > h4 {
        color: #0077b6;
        // font:400 1.2vmax;
        font-size: 1.3rem;
        text-align: center;
    }
    > p {
        color: black;
        // font:400 1vmax;
        font-weight: 400;
        font-size: 1.1rem;
        // margin: 0.2vmax;
        text-align: center;
    }
`;

const NoticeContainer = styled.div`
    border: 1px solid #272727;
    border-radius: 20px;
`;

const NoticeBar = styled.div`
    > h4 {
        margin: 0;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 20px;
        font-size: 1.3rem;
        color: #0077b6;
        background-color: #9bedff;
    }
`;

const NoticeContent = styled.div`
    padding: 10px;
    > p {
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
    }
`;

const TileContainer = styled(animated.div)``;

const ContentTile = styled(animated.div)`
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #909090",
    paddingInline: "10px",
    marginBottom: "0.5rem",
    borderRadius: "10px",
`;

const Content = {
    padding: "2px",
    fontSize: "1rem",
    fontWeight: "400",
};

const StudentDashboard = () => {
    const student = useSelector((store) => store.student);
    const navigate = useNavigate();
    const updateProfile = () => {
        navigate("/student/update");
    };

    const updatePassword = () => {
        navigate("/student/updatePassword");
    };

    const subjectList = () => {
        navigate("/student/subjects");
    };

    const marksList = () => {
        navigate("/student/performance");
    };

    const attendance = () => {
        navigate("/student/attendance");
    };

    const searchStudent = () => {
        navigate("/student/search");
    };

    const chatList = () => {
        navigate("/student/chatList");
    };

    const [announcementState, setAnnouncementState] = useState({
        status: "loading",
        data: null,
        error: null,
    });

    const [eventState, setEventState] = useState({
        status: "loading",
        data: null,
        error: null,
    });

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 500 },
    });

    const tileContainerBounce = useSpring({
        transform: "scale(1)", // Initial scale
        from: { transform: "scale(0.9)" }, // Starting scale
        config: config.wobbly, // Bouncy effect
    });

    const contentTileBounce = useSpring({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #909090",
        paddingInline: "10px",
        marginBottom: "0.5rem",
        borderRadius: "10px",
        transform: "scale(1)", // Initial scale
        from: { transform: "scale(0.9)" }, // Starting scale
        config: config.wobbly, // Bouncy effect
    });

    function loadAnnouncements() {
        axios
            .get("/api/admin/announcements")
            .then((res) => {
                console.log(res);

                setAnnouncementState({
                    status: "loaded",
                    data: res.data,
                    error: null,
                });
            })
            .catch((err) => {
                console.log(err);

                setAnnouncementState({
                    status: "error",
                    data: null,
                    error: err,
                });
            });
    }

    useEffect(() => {
        loadAnnouncements();
    }, []);

    function loadEvents() {
        axios
            .get("/api/admin/events")
            .then((res) => {
                console.log(res);

                setEventState({
                    status: "loaded",
                    data: res.data,
                    error: null,
                });
            })
            .catch((err) => {
                console.log(err);

                setEventState({
                    status: "error",
                    data: null,
                    error: err,
                });
            });
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <>
            {student.isAuthenticated ? (
                <>
                    <StudentNavbar />
                    <Container>
                        <SubContainer style={fadeIn}>
                            <Header>
                                <h1>Student Profile</h1>
                                <img src={student.student.student.avatar.url} />
                                <h3>{student.student.student.name}</h3>
                                <h3>
                                    {student.student.student.registrationNumber}
                                </h3>
                                <Link to="/student/update">Update Profile</Link>
                            </Header>
                            <HeaderOne>
                                <MenuItem onClick={updateProfile}>
                                    <Item>
                                        <Person
                                            onClick={updateProfile}
                                            style={{ color: "#0077b6" }}
                                        />
                                    </Item>
                                    <h1>Update Profile</h1>
                                </MenuItem>
                                <MenuItem onClick={marksList}>
                                    <Dashboard
                                        onClick={marksList}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Marks List</h1>
                                </MenuItem>
                                <MenuItem onClick={updatePassword}>
                                    <VpnKey
                                        onClick={updatePassword}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Update Password</h1>
                                </MenuItem>
                                <MenuItem onClick={searchStudent}>
                                    <Search
                                        onClick={searchStudent}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Search Students</h1>
                                </MenuItem>
                                <MenuItem onClick={attendance}>
                                    <Group
                                        onClick={attendance}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Attendance</h1>
                                </MenuItem>
                                <MenuItem onClick={subjectList}>
                                    <Ballot
                                        onClick={subjectList}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Subject List</h1>
                                </MenuItem>
                                <MenuItem onClick={chatList}>
                                    <Chat
                                        onClick={chatList}
                                        style={{ color: "#0077b6" }}
                                    />
                                    <h1>Messages</h1>
                                </MenuItem>
                            </HeaderOne>
                        </SubContainer>
                        <ProfileContainer style={fadeIn}>
                            <Section>
                                <SectionItem>
                                    <h4>Assessment</h4>
                                    <p>12</p>
                                </SectionItem>
                                <SectionItem>
                                    <h4>Attendance</h4>
                                    <p>14</p>
                                </SectionItem>
                                <SectionItem>
                                    <h4>Curriculum</h4>
                                    <p>52</p>
                                </SectionItem>
                                <SectionItem>
                                    <h4>Announcements</h4>
                                    <p>2</p>
                                </SectionItem>
                                <SectionItem>
                                    <h4>Tasks</h4>
                                    <p>2</p>
                                </SectionItem>
                            </Section>
                            <ProfileInfo>
                                <ProfileInfoItem>
                                    <h4>Email</h4>
                                    <p>{student.student.student.email}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Department</h4>
                                    <p>{student.student.student.department}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Year</h4>
                                    <p>{student.student.student.year}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Mobile Number</h4>
                                    <p>
                                        {
                                            student.student.student
                                                .studentMobileNumber
                                        }
                                    </p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Father Name</h4>
                                    <p>{student.student.student.fatherName}</p>
                                </ProfileInfoItem>
                                <ProfileInfoItem>
                                    <h4>Parent Number</h4>
                                    <p>
                                        {
                                            student.student.student
                                                .fatherMobileNumber
                                        }
                                    </p>
                                </ProfileInfoItem>
                            </ProfileInfo>
                            <NoticeContainer>
                                <NoticeBar>
                                    <h4>Announcements</h4>
                                </NoticeBar>
                                <NoticeContent style={tileContainerBounce}>
                                    {announcementState.status === "loading" ? (
                                        <p>Loading....</p>
                                    ) : announcementState.data ? (
                                        <TileContainer>
                                            {announcementState.data.result.map(
                                                (announcement) => {
                                                    console.log(announcement);
                                                    return (
                                                        <ContentTile
                                                            style={
                                                                contentTileBounce
                                                            }
                                                            key={
                                                                announcement._id
                                                            }
                                                        >
                                                            <p style={Content}>
                                                                {
                                                                    announcement.content
                                                                }
                                                            </p>
                                                            <p>
                                                                {moment(
                                                                    announcement.createdAt
                                                                ).format(
                                                                    "DD-MM-YYYY, hh:mm:ss a"
                                                                )}
                                                            </p>
                                                        </ContentTile>
                                                    );
                                                }
                                            )}
                                        </TileContainer>
                                    ) : (
                                        <p>Some error occurred</p>
                                    )}
                                </NoticeContent>
                            </NoticeContainer>
                            <NoticeContainer>
                                <NoticeBar>
                                    <h4>Upcoming Events</h4>
                                </NoticeBar>
                                <NoticeContent style={tileContainerBounce}>
                                    {eventState.status === "loading" ? (
                                        <p>Loading....</p>
                                    ) : eventState.data ? (
                                        <TileContainer>
                                            {eventState.data.result.map(
                                                (event) => {
                                                    console.log(event);
                                                    return (
                                                        <ContentTile
                                                            style={
                                                                contentTileBounce
                                                            }
                                                            key={event._id}
                                                        >
                                                            <p style={Content}>
                                                                {event.content}
                                                            </p>
                                                            <p>
                                                                {moment(
                                                                    event.createdAt
                                                                ).format(
                                                                    "DD-MM-YYYY, hh:mm:ss a"
                                                                )}
                                                            </p>
                                                        </ContentTile>
                                                    );
                                                }
                                            )}
                                        </TileContainer>
                                    ) : (
                                        <p>Some error occured</p>
                                    )}
                                </NoticeContent>
                            </NoticeContainer>
                        </ProfileContainer>
                    </Container>
                </>
            ) : (
                navigate("/")
            )}
        </>
    );
};

export default StudentDashboard;
