import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
// import "./EventPanel.css";

const AnimatedDiv = animated.div;

export function EventPanel() {
    const [fetchState, setFetchState] = useState({
        status: "loading",
        result: null,
        error: null,
    });

    function loadEvents() {
        axios
            .get("/api/admin/events")
            .then((res) => {
                console.log(res);

                setFetchState({
                    status: "loaded",
                    data: res.data.result,
                    error: null,
                });
            })
            .catch((err) => {
                console.log(err);

                setFetchState({
                    status: "error",
                    data: null,
                    error: null,
                });
            });
    }

    async function addEvent(event) {
        const response = await axios.post("/api/admin/events", event);

        setFetchState((state) => {
            // return {
            //     ...state,
            //     data: {
            //         ...state.data,
            //         result: [response.data.result, ...state.data.result],
            //     },
            // };
            return {
                ...state,
                data: [response.data.result, ...state.data],
            };
        });

        console.log(response);
    }

    const handleDelete = async (deletedId) => {
        try {
            // Make a DELETE request to your server
            const response = await axios.delete(
                `/api/admin/events/${deletedId}`
                // {
                //     method: "DELETE",
                //     headers: {
                //         "Content-Type": "application/json",
                //         // Include any additional headers if needed
                //     },
                //     // You can include credentials: 'include' if you're dealing with cookies and authentication
                // }
            );

            setFetchState((prevState) => ({
                ...prevState,
                data: prevState.data.filter((x) => x._id != deletedId),
            }));
            // if (!response.ok) {
            //     // Handle errors based on the response status
            //     const errorMessage = await response.text();
            //     throw new Error(
            //         `Failed to delete event: ${errorMessage}`
            //     );
            // }

            // If successful, trigger the onDelete callback
            // onDelete(deletedId);
        } catch (error) {
            console.error("Error deleting event:", error.message);
            // Handle the error as needed (e.g., show an error message to the user)
        }
    };

    function handleOnSubmit(e) {
        e.preventDefault();

        const eventAddForm = e.target;

        const data = Object.fromEntries(new FormData(eventAddForm).entries());
        console.log(data);

        addEvent(data).then((_) => eventAddForm.reset());
    }

    useEffect(() => {
        loadEvents();
    }, []);

    const events = fetchState.data ?? [];

    const Form = {
        display: "flex",
        alignItems: "center",
        paddingInline: "15px",
        paddingTop: "10px",
        paddingBottom: "18px",
    };

    const TextBox = {
        width: "100%",
        padding: "15px",
        marginRight: "20px",
        borderRadius: "10px",
        border: "1px solid #909090",
        fontSize: "1rem",
    };

    const Button = {
        backgroundColor: "lightblue",
        border: "none",
        borderRadius: "10px",
        fontSize: "1rem",
        padding: "8px",
        cursor: "pointer",
    };

    const List = {
        listStyleType: "none",
        padding: "0",
    };

    const ListItem = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1rem",
        padding: "10px",
        border: "1px solid #909090",
        borderRadius: "10px",
        marginInline: "15px",
        marginBottom: "10px",
    };

    const Delete = {
        backgroundColor: "lightblue",
        border: "none",
        borderRadius: "10px",
        fontSize: "1rem",
        padding: "5px",
        cursor: "pointer",
    };

    const TimeContainer = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
    };

    const TimeBox = {
        padding: "5px",
        margin: "0",
        alignItems: "flex-end",
    };

    const bounceEffect = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: {
            duration: 1000,
            tension: 300,
            friction: 10,
        },
    });

    return (
        <AnimatedDiv style={bounceEffect}>
            <div>
                <div>
                    <ul style={List}>
                        {events.map((event) => {
                            return (
                                <li key={`event_${event._id}`} style={ListItem}>
                                    {event.content}
                                    <div style={TimeContainer}>
                                        <p style={TimeBox}>
                                            {moment(event.createdAt).format(
                                                "DD-MM-YYYY, hh:mm:ss a"
                                            )}
                                        </p>
                                        <button
                                            onClick={() =>
                                                handleDelete(event._id)
                                            }
                                            style={Delete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <form onSubmit={handleOnSubmit} style={Form}>
                        <input
                            type="text"
                            name="content"
                            placeholder="Message Here"
                            style={TextBox}
                        />
                        <button type="submit" style={Button}>
                            Add Message
                        </button>
                    </form>
                </div>
            </div>
        </AnimatedDiv>
    );
}
