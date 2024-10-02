import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold gradient-text">
          Bienvenue sur le Chatbot des Droits et Lois du Burkina Faso!
        </h1>
        <p className="leading-normal text-muted-foreground">
          Ce chatbot est conçu pour vous aider à comprendre vos droits et les lois qui vous concernent en tant que citoyen du Burkina Faso. posez vos questions et obtenez des réponses précises sur les droits civils, le droit du travail, les procédures et démarches juridiques et administratives, et bien plus. Informez-vous facilement et en toute confiance !
        </p>

        <p className="leading-normal text-muted-foreground">

        </p>
      </div>
    </div>
  )
}
