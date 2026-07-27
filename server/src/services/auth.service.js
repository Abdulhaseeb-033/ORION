
export const registerUser = async (userData) => {
    const { fullName, username, email, password } = userData;

    if (!fullName || !username || !email || !password) {
        throw new Error("All fields are required.");
    }

    return {
        success: true,
        message: "Validation Passed"
    };
};