export function IsSuccess(response: Service.Response): boolean {
  const code: number | undefined = response.code;
  if (code === undefined)
    return false;

  return code === 0;
}

export function IsNullOrUndefined(o: any): boolean {
  return o === undefined || o === null;
}

export async function CopyTextToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

export function GetNowTime(type: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padEnd(3, '0');
  let result: string = ''
  if (type === 1) {
    result = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  } else {
    result = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`
  }
  return result
}

// 定义一个函数来获取视频第一帧图片
export function GetFirstFrameImage(videoUrl: any) {
  return new Promise((resolve, reject) => {
    // 创建一个video元素
    let video = document.createElement('video');
    video.muted = true
    video.autoplay = true
    video.src = videoUrl;
    video.currentTime = 0;
    video.setAttribute("crossOrigin", 'anonymous');
    // 当视频准备好时，取第一帧图片
    video.addEventListener('canplaythrough', () => {
      let canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      let context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      let firstFrameImage = canvas.toDataURL('image/png');
      resolve(firstFrameImage);
    })
  })
}

