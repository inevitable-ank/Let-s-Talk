
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, BookOpen, MessageCircle, Zap } from "lucide-react"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const faqs = [
    {
      category: "Getting Started",
      items: [
        {
          question: "What is LumenChat?",
          answer:
            "LumenChat is an intelligent conversational interface that transforms conversations into structured knowledge through a Living Conversation Graph (LCG). It extracts tasks, insights, and relationships from your messages.",
        },
        {
          question: "How do I create a new conversation?",
          answer:
            "Click the 'New Conversation' button in the sidebar. Give it a title and description, then start chatting. You can invite other participants to join.",
        },
        {
          question: "How do I invite others to a conversation?",
          answer:
            "Open the conversation, click the 'Share' button, and enter the email addresses of people you want to invite. They'll receive an invitation and can join the conversation.",
        },
      ],
    },
    {
      category: "Features",
      items: [
        {
          question: "What is the Living Conversation Graph (LCG)?",
          answer:
            "The LCG is a visual representation of your conversation structure. It shows topics, connections, and relationships between different parts of your discussion, helping you see the bigger picture.",
        },
        {
          question: "How does task extraction work?",
          answer:
            "LumenChat automatically identifies actionable items from your conversations and extracts them as tasks. You can review, edit, and manage these tasks in the Tasks view.",
        },
        {
          question: "What are macros?",
          answer:
            "Macros are reusable conversation templates and quick responses. You can create custom macros to automate common tasks or responses in your conversations.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      items: [
        {
          question: "Is my data private?",
          answer:
            "Yes, LumenChat is privacy-first. Your conversations are encrypted and stored securely. You have full control over who can access your data.",
        },
        {
          question: "Can I delete my data?",
          answer:
            "Yes, you can delete individual conversations or your entire account from the Settings page. Deleted data cannot be recovered.",
        },
        {
          question: "How is my data used?",
          answer:
            "Your data is only used to provide LumenChat services. We never sell your data to third parties. You can review our privacy policy for more details.",
        },
      ],
    },
  ]

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Help & Documentation</h1>
          <p className="text-foreground-secondary text-lg">Find answers and learn how to use LumenChat</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Documentation</h3>
              <p className="text-sm text-foreground-secondary">Read our comprehensive guides</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Tips & Tricks</h3>
              <p className="text-sm text-foreground-secondary">Learn advanced features</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Contact Support</h3>
              <p className="text-sm text-foreground-secondary">Get help from our team</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-foreground-secondary" />
            <Input
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-surface border-border"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl font-bold text-foreground mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.items.map((item, index) => (
                    <AccordionItem key={index} value={`${category.category}-${index}`} className="border-border">
                      <AccordionTrigger className="text-foreground hover:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground-secondary">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="w-12 h-12 text-foreground-secondary mx-auto mb-4 opacity-50" />
                <p className="text-foreground-secondary">No results found. Try a different search term.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-surface border-border">
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>Can't find what you're looking for?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-secondary mb-4">
              Contact our support team and we'll be happy to help you get the most out of LumenChat.
            </p>
            <Button className="bg-primary hover:bg-primary-dark">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
