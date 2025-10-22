
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: string
  completed: boolean
}

export default function OnboardingPage() {
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 1,
      title: "Create Your First Conversation",
      description: "Start a new conversation and invite team members to collaborate",
      icon: "💬",
      completed: false,
    },
    {
      id: 2,
      title: "Explore the Living Conversation Graph",
      description: "Visualize your conversation structure and see how topics connect",
      icon: "🕸️",
      completed: false,
    },
    {
      id: 3,
      title: "Extract Tasks",
      description: "Let LumenChat automatically identify and extract actionable tasks",
      icon: "✓",
      completed: false,
    },
    {
      id: 4,
      title: "Create Custom Macros",
      description: "Build reusable conversation templates for common scenarios",
      icon: "⚡",
      completed: false,
    },
    {
      id: 5,
      title: "Configure Privacy Settings",
      description: "Set up your privacy preferences and data sharing controls",
      icon: "🔒",
      completed: false,
    },
  ])

  const handleCompleteStep = (id: number) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, completed: true } : step)))
  }

  const completedCount = steps.filter((s) => s.completed).length
  const progress = (completedCount / steps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to LumenChat</h1>
          <p className="text-foreground-secondary text-lg">Let's get you started with a quick tour</p>
        </div>

        {/* Progress */}
        <Card className="mb-8 bg-surface border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">
                Progress: {completedCount} of {steps.length}
              </span>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step) => (
            <Card
              key={step.id}
              className={`transition-all ${step.completed ? "bg-surface border-primary/20" : "hover:shadow-md"}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{step.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      {step.completed && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    </div>
                    <p className="text-sm text-foreground-secondary">{step.description}</p>
                  </div>
                  {!step.completed && (
                    <Button
                      variant="outline"
                      onClick={() => handleCompleteStep(step.id)}
                      className="gap-2 whitespace-nowrap"
                    >
                      Start <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                  {step.completed && <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          {completedCount === steps.length ? (
            <div className="space-y-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-900 mb-1">You're all set!</h3>
                  <p className="text-green-700 mb-4">
                    You've completed the onboarding. Ready to start using LumenChat?
                  </p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link to="/">Go to Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-foreground-secondary">Complete all steps to finish onboarding</p>
          )}
        </div>
      </div>
    </div>
  )
}
