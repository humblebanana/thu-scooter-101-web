export interface TranslationType {
  nav: {
    home: string
    buyingGuide: string
    usageGuide: string
    repairMaintenance: string
    lawsSafety: string
  }
  home: {
    welcome: {
      mainTitle: string
      subTitle: string
      startButton: string
    }
    sections: {
      buyingGuide: {
        title: string
        description: string
      }
      usageGuide: {
        title: string
        description: string
      }
      repairMaintenance: {
        title: string
        description: string
      }
      lawsSafety: {
        title: string
        description: string
      }
      faq: {
        title: string
        description: string
      }
      learnMore: string
    }
  }
  chat: {
    welcome: {
      title: string
      subtitle: string
    }
    input: {
      placeholder: string
    }
    button: {
      stop: string
    }
    avatar: {
      alt: string
    }
  }
  buyingGuide: {
    title: string
    subtitle: string
    recommendedScooters: {
      title: string
      subtitle: string
      details: {
        brand: string
        price: string
        range: string
        seniorSays: string
      }
    }
    purchaseChannels: {
      title: string
      subtitle: string
      details: {
        location: string
        contact: string
        priceRange: string
      }
    }
    registration: {
      title: string
      subtitle: string
      process: {
        title: string
        steps: string[]
      }
      notices: {
        title: string
        items: string[]
      }
    }
  }
  repairMaintenance: {
    title: string
    subtitle: string
    repairStations: {
      title: string
      seniorReviews: string
    }
    maintenanceTips: {
      title: string
      dailyCheck: {
        title: string
        description: string
      }
      batteryUsage: {
        title: string
        description: string
      }
      rainProtection: {
        title: string
        description: string
      }
      regularMaintenance: {
        title: string
        description: string
      }
      winterUsage: {
        title: string
        description: string
      }
    }
  }
  faq: {
    title: string
    subtitle: string
    loading: string
    error: string
  }
}

export interface Translations {
  zh: TranslationType
  en: TranslationType
}