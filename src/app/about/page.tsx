import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaBlog, FaEnvelope } from 'react-icons/fa';
import { BilingualText } from '@/components/BilingualText';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
                    {/* 头部区域 */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            <BilingualText
                                zh="关于作者"
                                en="About Me"
                            />
                        </h1>
                        <div className="flex justify-center space-x-4">
                            <Link
                                href="https://github.com/strawferry"
                                target="_blank"
                                className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                                <FaGithub size={24} />
                            </Link>
                            <Link
                                href="https://blog.ferryvip.com"
                                target="_blank"
                                className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                                <FaBlog size={24} />
                            </Link>
                            <Link
                                href="mailto:ferryvip@163.com"
                                className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                                <FaEnvelope size={24} />
                            </Link>
                        </div>
                    </div>

                    {/* 简介部分 */}
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                <BilingualText
                                    zh="👋 你好，我是 ferryvip"
                                    en="👋 Hi, I'm ferryvip"
                                />
                            </h2>
                            <p className="mb-4">
                                <BilingualText
                                    zh="一名全栈开发者来自中国 🇨🇳 北京，热爱编程和新技术。目前专注于 React、React Native 和 Node.js 开发。"
                                    en="A full-stack developer from Beijing, China 🇨🇳, passionate about programming and new technologies. Currently focusing on React, React Native, and Node.js development."
                                />
                            </p>
                        </div>

                        {/* 技术栈 */}
                        {/* <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                <BilingualText
                                    zh="🛠️ 技术栈"
                                    en="🛠️ Tech Stack"
                                />
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'JavaScript', 'TypeScript', 'React', 'React Native',
                                    'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL'
                                ].map(tech => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-sm rounded-full
                      bg-gray-100 dark:bg-gray-700
                      text-gray-700 dark:text-gray-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div> */}

                        {/* 个人兴趣爱好介绍 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                <BilingualText
                                    zh="🌟 兴趣爱好"
                                    en="🌟 Interests & Community"
                                />
                            </h2>
                            <p className="mb-4">
                                <BilingualText
                                    zh="除了编程，我还热衷于："
                                    en="Besides programming, I'm passionate about:"
                                />
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                    <BilingualText
                                        zh="交朋友 - 喜欢认识来自不同背景的朋友"
                                        en="Making Friends - Love meeting people from different backgrounds"
                                    />
                                    <BilingualText
                                        zh="分享知识 - 乐于分享技术经验和生活技巧"
                                        en="Knowledge Sharing - Enjoy sharing technical experience and life tips"
                                    />
                                    <BilingualText
                                        zh="互助学习 - 相信在交流中共同进步"
                                        en="Mutual Learning - Believe in growing together through communication"
                                    />
                            </ul>
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    <BilingualText
                                        zh="🤝 加入我们的社群"
                                        en="🤝 Join Our Community"
                                    />
                                </h3>
                                <p className="mb-4">
                                    <BilingualText
                                        zh="我们有一个活跃的学习交流群，欢迎加入："
                                        en="We have an active learning community, welcome to join:"
                                    />
                                </p>
                                <img src="https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250117/18-12-14-cdWrnO.jpg" alt="wechat group" className='w-1/2 mx-auto rounded-lg' />
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                        <BilingualText
                                            zh="互相学习和分享经验,分享生活技巧和实用工具"
                                            en="Learn from and share experiences with each other, share life tips and useful tools"
                                        />
                                </ul>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <BilingualText
                                        zh="* 如果群已满，可以添加我的个人微信，我会帮您加入群聊"
                                        en="* If the group is full, you can add my personal WeChat and I'll help you join"
                                    />
                                </p>
                            </div>
                        </div>

                        {/* 联系方式 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                <BilingualText
                                    zh="📫 联系我"
                                    en="📫 Contact Me"
                                />
                            </h2>
                            <p>
                                <BilingualText
                                    zh="如果你对我或者我的项目感兴趣，或者想要合作，欢迎通过以下方式联系我："
                                    en="If you're interested in me or my projects, or want to collaborate, feel free to reach out:"
                                />
                            </p>
                            <div className="flex justify-center">
                                <img src="https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250117/17-20-16-WeChat.png" alt="wechat" className='w-1/2 mr-6 rounded-lg' />
                                <img src="https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250117/17-18-25-xiaohongshu.png" alt="xiaohongshu" className='w-1/2 rounded-lg' />
                            </div>
                            <ul className="list-disc list-inside mt-2">
                                <li>Email: ferryvip@163.com</li>
                                <li>GitHub: @strawferry</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 