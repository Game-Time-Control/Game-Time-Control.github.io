export const apiUrl = "https://time-control-server.herokuapp.com";

export function downloadClient() {
    setTimeout(() => {
        const response = {
            file: `${apiUrl}/download`,
        };
        // server sent the url to the file!
        // now, let's download:
        window.open(response.file);
        // you could also do:
        // window.location.href = response.file;
    }, 100);
}