export default {
    testEnvironment: "node",
    transform: {},
    setupFilesAfterEnv: ["./test/jest.setup.js"],
    reporters: [
        "default",
        ["jest-html-reporters", {
            publicPath: "./test-report",
            filename: "report.html"
        }]
    ]
}