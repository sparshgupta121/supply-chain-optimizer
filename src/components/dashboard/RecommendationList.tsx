import React from 'react';
import { CheckCircle, Lightbulb, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Recommendation } from '../../stores/supplyChainStore';
import { useSupplyChainStore } from '../../stores/supplyChainStore';

interface RecommendationListProps {
  recommendations: Recommendation[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  const { applyRecommendation } = useSupplyChainStore();
  
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        No recommendations available at this time.
      </div>
    );
  }
  
  const getDifficultyBadge = (difficulty: number) => {
    if (difficulty <= 2) {
      return <span className="badge bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">Easy</span>;
    } else if (difficulty <= 4) {
      return <span className="badge bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300">Medium</span>;
    } else {
      return <span className="badge bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300">Complex</span>;
    }
  };
  
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <div key={recommendation.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg">
              <Lightbulb className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900 dark:text-white">{recommendation.description}</h3>
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>Confidence:</span>
                  <span className="font-medium">{Math.floor(recommendation.confidence * 100)}%</span>
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="flex items-center">
                  {recommendation.impact.cost > 0 ? (
                    <TrendingDown className="h-4 w-4 text-success-500 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-error-500 mr-1" />
                  )}
                  <span className="text-gray-600 dark:text-gray-400">Cost: </span>
                  <span className={`ml-1 font-medium ${recommendation.impact.cost > 0 ? 'text-success-700 dark:text-success-400' : 'text-error-700 dark:text-error-400'}`}>
                    {recommendation.impact.cost > 0 ? '-' : '+'}${Math.abs(recommendation.impact.cost).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center">
                  {recommendation.impact.time < 0 ? (
                    <TrendingDown className="h-4 w-4 text-success-500 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-error-500 mr-1" />
                  )}
                  <span className="text-gray-600 dark:text-gray-400">Time: </span>
                  <span className={`ml-1 font-medium ${recommendation.impact.time < 0 ? 'text-success-700 dark:text-success-400' : 'text-error-700 dark:text-error-400'}`}>
                    {recommendation.impact.time < 0 ? '-' : '+'}
                    {Math.abs(recommendation.impact.time)} days
                  </span>
                </div>
                
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
                  <span className="text-gray-600 dark:text-gray-400">Reliability: </span>
                  <span className="ml-1 font-medium text-success-700 dark:text-success-400">
                    +{recommendation.impact.reliability}%
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty: </span>
                  <span className="ml-1">
                    {getDifficultyBadge(recommendation.implementationDifficulty)}
                  </span>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => applyRecommendation(recommendation.id)}
                    className="btn btn-sm btn-primary inline-flex items-center"
                  >
                    <CheckCircle size={14} className="mr-1" />
                    <span>Apply</span>
                  </button>
                  
                  <button className="btn btn-sm bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 inline-flex items-center">
                    <span>Details</span>
                  </button>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={14} className="mr-1" />
                  <span>Est. implementation: {recommendation.implementationDifficulty * 2} days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;