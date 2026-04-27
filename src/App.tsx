import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Camera, Download, Share2, Menu, Search, ChevronLeft } from 'lucide-react';

export default function App() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleDownload = async () => {
    if (!captureRef.current) return;
    try {
      setIsCapturing(true);
      
      // small delay to ensure React state updates if needed, though not strictly required here
      await new Promise(r => setTimeout(r, 100)); 

      const dataUrl = await toPng(captureRef.current, {
        pixelRatio: 3, // High resolution
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'news_article_capture.png';
      link.click();
    } catch (err) {
      console.error('Failed to capture image', err);
      // alert won't work perfectly in iframe without user interaction, but console is fine.
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 font-sans flex flex-col items-center overflow-x-auto">
      {/* Floating Action Button for Download */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleDownload}
          disabled={isCapturing}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
          title="PNG 다운로드"
        >
          <Download size={24} />
          <span className="ml-2 font-bold pr-1 text-sm">{isCapturing ? '저장 중...' : '이미지로 저장'}</span>
        </button>
      </div>

      <div className="w-full mb-4 text-center text-gray-500 text-sm font-medium">
        아래 기사 화면이 실제 PNG로 저장됩니다. 가로 스크롤을 통해 전체 화면을 확인하세요.
      </div>

      {/* Capture Area */}
      <div 
        ref={captureRef}
        className="w-[1600px] min-w-[1600px] bg-white text-gray-900 font-sans shadow-2xl relative overflow-hidden flex flex-col my-4 origin-top"
      >
        {/* Header - Mock Navigation matching theme */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-screen-xl mx-auto px-10 h-24 flex items-center justify-between">
            <div className="flex items-center gap-12">
              <h1 className="text-5xl font-black text-blue-800 tracking-tighter">한국일보</h1>
              <nav className="flex gap-10 text-3xl font-bold text-gray-600">
                <span className="text-blue-800 border-b-4 border-blue-800 py-6">사회</span>
                <span className="py-6">정치</span>
                <span className="py-6">경제</span>
                <span className="py-6">문화</span>
                <span className="py-6">연예</span>
                <span className="py-6">스포츠</span>
              </nav>
            </div>
            <div className="flex items-center gap-8 text-gray-400">
               <Search size={36} />
               <Menu size={36} />
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <main className="flex-1 max-w-screen-xl w-full mx-auto px-10 py-12 flex gap-16">
          {/* Article Section */}
          <article className="flex-1 border-r border-gray-100 pr-16">
            <div className="mb-10">
              <p className="text-blue-600 font-bold text-2xl mb-4">사회 &gt; 사건사고</p>
              <h2 className="text-[60px] leading-tight font-extrabold tracking-tight text-gray-950 mb-8 break-keep">
                🚨 '그림자 살인마' 11번째 피해자 발견... 경찰 "극도로 지능적 범행"
              </h2>
              
              <div className="flex items-center justify-between py-6 border-y border-gray-100 text-2xl text-gray-500">
                <div className="flex gap-6">
                  <span className="font-bold text-gray-700">김민준 기자</span>
                  <span>입력 2020.08.25 23:37</span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="border border-gray-200 px-2 text-xl">가</span>
                  <span className="border border-gray-200 px-3 text-3xl font-bold">가</span>
                  <span className="text-gray-300 mx-2">|</span>
                  <Share2 size={24} />
                </div>
              </div>
            </div>

            <div className="text-4xl leading-[1.8] text-gray-800 space-y-12 break-keep custom-prose">
              <p>
                서울 마포구 일대에서 또 다시 신원불명 시신이 발견되며, 일명 '그림자 살인마'로 불리는 연쇄살인범의 소행으로 추정되고 있다.
              </p>
              
              <p>
                경찰에 따르면 지난 2018년 10월부터 현재까지 총 11명의 피해자가 발생했으며, 범행 패턴은 매우 계획적이고 증거 인멸이 철저한 것으로 알려졌다. 피해자들은 성별·연령·직업이 제각각이며 공통점을 찾기 어려워 수사에 난항을 겪고 있다.
              </p>

              {/* Montage Area - Theme layout */}
              <div className="flex gap-12 bg-gray-50 p-10 rounded-xl border border-gray-200 my-16">
                {/* Montage Image */}
                <div className="w-80 flex-shrink-0">
                  <img 
                    src="https://i.postimg.cc/m2q2Z7Tj/mongtaju.png" 
                    alt="용의자 몽타주" 
                    className="w-full h-auto border-2 border-gray-300 bg-white shadow-sm p-2"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-red-600 mb-6 text-3xl">[수배 요망] 30대 초중반 추정 남성</h4>
                  <ul className="text-2xl text-gray-600 space-y-4 font-medium">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-4">•</span>
                      <span>키 180cm 이상, 단정한 인상</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-4">•</span>
                      <span>평소 마스크 착용이 잦음</span>
                    </li>
                    <li className="flex items-center mt-6 text-gray-800">
                      <span className="mr-4 text-4xl">📞</span>
                      <span className="font-bold">제보: </span>
                      <span className="font-extrabold text-blue-700 ml-4 tracking-wide text-3xl border-b-[3px] border-blue-700">02-XXXX-XXXX</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <p className="font-bold text-xl bg-red-100 text-red-700 px-6 py-3 inline-block rounded-md">
                      ※ 주의: 혼자 대응하지 말고 즉시 신고할 것
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-bold text-[40px] text-gray-950 border-l-8 border-blue-800 pl-6 my-12 tracking-tight">
                "CCTV 사각지대만 골라 범행... 디지털 흔적 전무"
              </p>
              
              <p>
                서울경찰청 관계자는 "범인은 CCTV와 목격자가 없는 심야 시간대를 노리며, 현장에 남긴 증거가 거의 전무하다"며 "매우 지능적이고 계획적인 범행"이라고 밝혔다. 
              </p>

              <p className="font-bold text-[40px] text-gray-950 border-l-8 border-blue-800 pl-6 my-12 tracking-tight">
                시민 제보 절실... 최고 5천만 원 포상금
              </p>

              <p>
                경찰은 범인으로 추정되는 인물의 몽타주를 공개하며 시민들의 적극적인 제보를 당부했다. 목격 시 즉시 112 또는 스마트 국민제보 앱을 통해 신고해 달라고 강조했다.
              </p>
            </div>
            
            <div className="mt-20 pt-8 border-t border-gray-100">
               <p className="text-gray-400 text-2xl font-medium">저작권자 © 한국일보. 무단전재 및 재배포 금지.</p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-[480px] flex-shrink-0">
            <div className="mb-12">
              <h3 className="text-3xl font-bold border-b-4 border-gray-900 pb-4 mb-6">가장 많이 본 뉴스</h3>
              <ul className="space-y-8">
                <li className="flex gap-6 items-start group cursor-pointer">
                  <span className="text-blue-600 font-extrabold italic text-4xl leading-none font-serif mt-1">1</span>
                  <p className="text-2xl font-medium leading-snug text-gray-800 group-hover:underline">정부, 추석 연휴 특별 방역 대책 발표... "고향 방문 자제 권고"</p>
                </li>
                <li className="flex gap-6 items-start group cursor-pointer">
                  <span className="text-blue-600 font-extrabold italic text-4xl leading-none font-serif mt-1">2</span>
                  <p className="text-2xl font-medium leading-snug text-gray-800 group-hover:underline">태풍 '바비' 북상 중, 내일부터 전국 영향권... 기상청 예보</p>
                </li>
                <li className="flex gap-6 items-start group cursor-pointer">
                  <span className="text-blue-600 font-extrabold italic text-4xl leading-none font-serif mt-1">3</span>
                  <p className="text-2xl font-medium leading-snug text-gray-800 group-hover:underline">오늘의 증시: 코스피 상승 마감, 외인 매수세 유입에 2400선 안착</p>
                </li>
                <li className="flex gap-6 items-start group cursor-pointer">
                  <span className="text-blue-600 font-extrabold italic text-4xl leading-none font-serif mt-1">4</span>
                  <p className="text-2xl font-medium leading-snug text-gray-800 group-hover:underline">비대면 시대의 명암... 고령층 디지털 소외 현상 심화</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 border-2 border-blue-100 rounded-lg flex flex-col">
              <p className="text-xl text-blue-800 font-bold mb-3">AD</p>
              <div className="w-full h-64 bg-white relative overflow-hidden group cursor-pointer border border-blue-100 rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1584036561565-b155d0505bdf?auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="방역 마스크 광고" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/20 flex flex-col justify-center p-6">
                  <span className="text-white text-xl font-bold mb-2 opacity-90 tracking-widest">COVID-19 완벽 대비</span>
                  <span className="text-white font-black text-4xl mb-3 leading-tight drop-shadow-md">식약처 인증<br/>KF94 마스크</span>
                  <span className="text-blue-900 font-extrabold text-lg bg-yellow-300 w-fit px-4 py-1 rounded shadow-sm mt-2">100매 한정 특가 ₩19,900</span>
                </div>
              </div>
            </div>
          </aside>
        </main>

        {/* Footer-like meta */}
        <footer className="bg-gray-50 border-t-2 border-gray-200 py-10">
          <div className="max-w-screen-xl w-full mx-auto px-10 text-2xl text-gray-400 flex justify-between font-medium">
            <p>© HANKOOK ILBO All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-gray-800 cursor-pointer transition-colors">회사소개</span>
              <span className="text-gray-600 font-bold hover:text-gray-800 cursor-pointer transition-colors">개인정보처리방침</span>
              <span className="hover:text-gray-800 cursor-pointer transition-colors">고객센터</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
