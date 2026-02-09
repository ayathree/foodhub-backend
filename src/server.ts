import app from "./app";


const bootstrap = () => {
    try {
        app.listen(5000, () => {
            console.log(`HealthySkin Server is running on http://localhost:5000`);
        });


    } catch (error) {
        console.log("failed to start server:", error)
    }
}

bootstrap();