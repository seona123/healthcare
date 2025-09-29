import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Filter, TrendingUp, Calendar } from 'lucide-react';

const Community: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const filters = ['전체', '운동', '식단', '수면', '목표달성', '팁공유'];

  const posts = [
    {
      id: '1',
      author: '런닝맨김',
      avatar: '🏃‍♂️',
      time: '2시간 전',
      category: '운동',
      title: '마라톤 완주 성공!',
      content: '6개월 준비 끝에 첫 풀마라톤을 완주했어요! 페이스 조절이 정말 중요한 것 같아요.',
      image: '🏃‍♂️🏅',
      likes: 24,
      comments: 8,
      achievements: ['42.2km 완주', '목표시간 달성']
    },
    {
      id: '2',
      author: '건강한식단',
      avatar: '🥗',
      time: '4시간 전',
      category: '식단',
      title: '프로틴 볼 레시피 공유',
      content: '간단하고 맛있는 프로틴 볼 만들기! 운동 후 간식으로 완벽해요.',
      likes: 18,
      comments: 12,
      tags: ['프로틴', '간식', '레시피']
    },
    {
      id: '3',
      author: '수면왕',
      avatar: '😴',
      time: '1일 전',
      category: '수면',
      title: '수면 질 개선 후기',
      content: '블루라이트 차단과 정시 취침으로 수면 점수가 85점까지 올랐어요!',
      likes: 31,
      comments: 15,
      progress: { before: '6.2시간', after: '7.8시간' }
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '운동': return 'bg-emerald-500/20 text-emerald-400';
      case '식단': return 'bg-orange-500/20 text-orange-400';
      case '수면': return 'bg-purple-500/20 text-purple-400';
      case '목표달성': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">커뮤니티</h1>
          <p className="text-gray-400 mt-1">건강한 라이프스타일을 함께 공유해보세요</p>
        </div>
        <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
          게시글 작성
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-orange-400" />
          <h2 className="font-semibold text-gray-100">이주의 트렌드</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
            <div className="text-lg">🏃‍♂️</div>
            <div className="font-medium text-gray-100 mt-2">윈터 러닝</div>
            <div className="text-sm text-gray-400">234개 게시글</div>
          </div>
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
            <div className="text-lg">💧</div>
            <div className="font-medium text-gray-100 mt-2">수분 섭취</div>
            <div className="text-sm text-gray-400">189개 게시글</div>
          </div>
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4">
            <div className="text-lg">🧘‍♀️</div>
            <div className="font-medium text-gray-100 mt-2">명상 챌린지</div>
            <div className="text-sm text-gray-400">156개 게시글</div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg">
                  {post.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-100">{post.author}</div>
                  <div className="text-sm text-gray-400">{post.time}</div>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">{post.title}</h3>
              <p className="text-gray-300">{post.content}</p>
            </div>

            {/* Post Media/Data */}
            {post.image && (
              <div className="rounded-xl bg-gray-700 p-8 text-center text-4xl mb-4">
                {post.image}
              </div>
            )}

            {/* Achievements */}
            {post.achievements && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.achievements.map((achievement, index) => (
                  <span key={index} className="rounded-full bg-emerald-500/20 text-emerald-400 px-3 py-1 text-xs font-medium">
                    🏆 {achievement}
                  </span>
                ))}
              </div>
            )}

            {/* Progress */}
            {post.progress && (
              <div className="rounded-xl bg-gray-700/50 p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-400">이전</div>
                    <div className="text-xl font-semibold text-gray-300">{post.progress.before}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">현재</div>
                    <div className="text-xl font-semibold text-emerald-400">{post.progress.after}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-blue-400 text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  <Share className="h-5 w-5" />
                  <span className="text-sm">공유</span>
                </button>
              </div>
              <div className="text-sm text-gray-500">
                <Calendar className="h-4 w-4 inline mr-1" />
                {post.time}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="rounded-xl border border-gray-600 px-6 py-3 text-gray-300 hover:bg-gray-700 transition-colors">
          더 많은 게시글 보기
        </button>
      </div>
    </div>
  );
};

export default Community;