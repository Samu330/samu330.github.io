function descargarVideo() {
    var videoUrl = document.getElementById('videoUrl').value;
    var videoId = obtenerIdVideo(videoUrl);
    var videoDownloadUrl = 'https://www.ssyoutube.com/watch?v=' + videoId;

    window.location.href = videoDownloadUrl;
}

function obtenerIdVideo(url) {
    var videoId = '';

    if (url.includes('youtube.com')) {
        videoId = url.split('v=')[1];
    } else if (url.includes('youtu.be')) {
        videoId = url.split('.be/')[1];
    }

    return videoId;
}
