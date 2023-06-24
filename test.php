<?php
// Python 스크립트 실행을 위한 함수
function runPythonScript($script) {
    $command = "python3 " . $script;
    $output = shell_exec($command);
    return $output;
}

// 파이썬 스크립트 코드
$pythonScript = <<<PYTHON
from bs4 import BeautifulSoup
from selenium import webdriver
import time

browser = webdriver.Firefox()

for i in range(1, 5):
    browser.get('https://www.kyobobook.co.kr/bestSellerNew/bestseller.laf?targetPage=%s' % i)
    time.sleep(1)
    
    image_list = []
    
    source = browser.page_source
    parsed_source = BeautifulSoup(source, "html.parser")
    
    ol_list = parsed_source.find_all("ol", class_="prod_list")
    ol_list = ol_list[0]
    
    div_image_list = ol_list.select("img")
    for item in div_image_list:
        src = item.get('src')
        image_list.append(src)
        print(src)

browser.quit()
PYTHON;

// 임시 파이썬 스크립트 파일 생성
$scriptFile = tempnam(sys_get_temp_dir(), 'python');
file_put_contents($scriptFile, $pythonScript);

// 파이썬 스크립트 실행
$output = runPythonScript($scriptFile);

// 출력 결과를 배열로 변환
$images = explode("\n", trim($output));

// 이미지 출력
foreach ($images as $image) {
    echo '<img src="' . $image . '"><br>';
}

// 임시 파일 삭제
unlink($scriptFile);
?>
