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
                                    zh="一名全栈开发者，热爱编程和新技术。目前专注于 React、React Native 和 Node.js 开发。"
                                    en="A full-stack developer passionate about programming and new technologies. Currently focusing on React, React Native, and Node.js development."
                                />
                            </p>
                        </div>

                        {/* 技术栈 */}
                        <div>
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
                        </div>

                        {/* 个人兴趣爱好介绍 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                <BilingualText
                                    zh="🚀 项目经历"
                                    en="🚀 Projects"
                                />
                            </h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    <BilingualText
                                        zh="小红书中英文互译 - AI 驱动的翻译工具"
                                        en="Xiaohongshu Translator - AI-powered translation tool"
                                    />
                                </li>
                                <li>
                                    <BilingualText
                                        zh="React Native 移动应用开发"
                                        en="React Native Mobile App Development"
                                    />
                                </li>
                                <li>
                                    <BilingualText
                                        zh="企业级 Web 应用开发"
                                        en="Enterprise Web Application Development"
                                    />
                                </li>
                            </ul>
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
                            <ul className="list-disc list-inside mt-2">
                                <li>Email: ferryvip@163.com</li>
                                <li>GitHub: @strawferry</li>
                            </ul>
                            <div className="flex justify-center">
                                <img src="https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250117/17-20-16-WeChat.png" alt="wechat" className='w-1/2 mr-6 rounded-lg' />
                                <img src="https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250117/17-18-25-xiaohongshu.png" alt="xiaohongshu" className='w-1/2 rounded-lg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 